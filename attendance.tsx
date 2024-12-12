import { useState } from 'react';

export default function Attendance() {
  const [name, setName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [reason, setReason] = useState('');
  const [noReason, setNoReason] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dayOfWeek || !attendanceTime) {
      setStatus('Please enter your name, day of the week, and attendance time.');
      return;
    }

    let formData = {
      name,
      day: dayOfWeek,
      attendanceTime,
      reason: noReason ? 'None' : reason || 'On time',
    };

    try {
      const response = await fetch('https://formspree.io/f/xbljewne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Attendance submitted successfully!');
        setName('');
        setDayOfWeek('');
        setAttendanceTime('');
        setReason('');
        setNoReason(false);
      } else {
        setStatus('Failed to submit attendance.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  const renderFeedback = () => {
    if (!attendanceTime || dayOfWeek === 'Sunday') return null;

    const [hours, minutes] = attendanceTime.split(':').map(Number);
    const isBetween7And735 = hours === 7 && minutes >= 0 && minutes <= 35;

    if (isBetween7And735) {
      return <p style={{ color: 'green', fontWeight: 'bold' }}>Now that's PEAK! Well done 🎉</p>;
    }

    if (hours > 7 || (hours === 7 && minutes > 35)) {
      return (
        <div>
          <label>
            Reason for being late:
            <input
              type="text"
              placeholder="Enter your reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={noReason}
              required={!noReason}
            />
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={noReason}
                onChange={(e) => {
                  setNoReason(e.target.checked);
                  if (e.target.checked) setReason('');
                }}
              />
              None
            </label>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1>Log Shacharit Attendance</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          <label>
            Day of the week:
            <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} required>
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Attendance Time:
            <input
              type="time"
              value={attendanceTime}
              onChange={(e) => setAttendanceTime(e.target.value)}
              required
            />
          </label>
        </div>

        {renderFeedback()}

        <button type="submit">Submit Attendance</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
