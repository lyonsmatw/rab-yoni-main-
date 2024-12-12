import { useState } from 'react';

export default function PhoneCheck() {
  const [name, setName] = useState('');
  const [phoneInKitchen, setPhoneInKitchen] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [timeWentOffPhone, setTimeWentOffPhone] = useState('');
  const [inBedroom, setInBedroom] = useState('');
  const [validReason, setValidReason] = useState('');
  const [noReason, setNoReason] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dayOfWeek) {
      setStatus('Please enter your name and select the day of the week.');
      return;
    }

    let formData = {};

    if (phoneInKitchen === 'yes') {
      formData = { name, day: dayOfWeek, phoneStatus: 'Put in Kitchen by 11:00 PM' };
    } else if (phoneInKitchen === 'no') {
      if (!timeWentOffPhone || !inBedroom || (!validReason && !noReason)) {
        setStatus('Please enter the time, bedroom status, and a valid reason.');
        return;
      }

      formData = {
        name,
        day: dayOfWeek,
        phoneStatus: `Not in Kitchen, Time Went Off Phone: ${timeWentOffPhone}, In Bedroom: ${inBedroom}, Reason: ${
          noReason ? 'None' : validReason
        }`,
      };
    } else {
      setStatus('Please select an option for the phone check-in.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xbljewne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Phone check-in submitted successfully!');
        setName('');
        setPhoneInKitchen('');
        setDayOfWeek('');
        setTimeWentOffPhone('');
        setInBedroom('');
        setValidReason('');
        setNoReason(false);
      } else {
        setStatus('Failed to submit phone check-in.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Log Phone Check-in</h1>
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
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
        </div>

        <div>
          <h3>Phone was put in Kitchen by 11:00 PM?</h3>
          <label>
            <input
              type="radio"
              name="phoneCheck"
              value="yes"
              checked={phoneInKitchen === 'yes'}
              onChange={(e) => setPhoneInKitchen(e.target.value)}
            />
            Yes
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="phoneCheck"
              value="no"
              checked={phoneInKitchen === 'no'}
              onChange={(e) => setPhoneInKitchen(e.target.value)}
            />
            No
          </label>
        </div>

        {phoneInKitchen === 'yes' && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Congratulations you beat the yetzer hora!</p>
        )}

        {phoneInKitchen === 'no' && (
          <>
            <div>
              <label>
                When did you go off your phone?
                <input
                  type="time"
                  value={timeWentOffPhone}
                  onChange={(e) => setTimeWentOffPhone(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <h3>Was it in your bedroom?</h3>
              <label>
                <input
                  type="radio"
                  name="inBedroom"
                  value="yes"
                  checked={inBedroom === 'yes'}
                  onChange={(e) => setInBedroom(e.target.value)}
                />
                Yes
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name="inBedroom"
                  value="no"
                  checked={inBedroom === 'no'}
                  onChange={(e) => setInBedroom(e.target.value)}
                />
                No
              </label>
            </div>

            <div>
              <label>
                What was your valid reason? (99% probably not)
                <input
                  type="text"
                  placeholder="Enter your reason"
                  value={validReason}
                  onChange={(e) => setValidReason(e.target.value)}
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
                      if (e.target.checked) setValidReason('');
                    }}
                  />
                  None
                </label>
              </div>
            </div>
          </>
        )}

        <button type="submit">Submit Phone Check-in</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
