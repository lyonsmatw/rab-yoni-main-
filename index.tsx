import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Rabbi Yoni's J1 Class</h1>
      <nav>
        <ul>
          <li>
            <Link href="/attendance">Log Shacharit Attendance</Link>
          </li>
          <li>
            <Link href="/phone-check">Log Phone Check-in</Link>
          </li>
          <li>
            <Link href="/questions">Submit a Question</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
