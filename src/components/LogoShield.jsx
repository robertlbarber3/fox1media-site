export default function LogoShield() {
  return (
    <svg
      className="logo-shield"
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 48,
        height: 56,
        fill: 'none',
        stroke: 'var(--fg)',
        strokeWidth: 1.5,
      }}
    >
      <polygon points="50,5 95,20 95,70 50,115 5,70 5,20" />
      <polygon points="50,12 88,25 88,67 50,105 12,67 12,25" stroke="var(--grey)" strokeWidth="1" strokeDasharray="2 2" />
      <polygon points="50,85 25,45 40,45" />
      <polygon points="50,85 75,45 60,45" />
      <polygon points="25,45 15,25 35,35" />
      <polygon points="75,45 85,25 65,35" />
      <polygon points="50,70 42,50 58,50" />
      <polygon
        points="35,48 43,53 38,58"
        style={{ fill: 'var(--accent)', stroke: 'none', filter: 'drop-shadow(0 0 4px var(--accent))' }}
      />
      <polygon
        points="65,48 57,53 62,58"
        style={{ fill: 'var(--accent)', stroke: 'none', filter: 'drop-shadow(0 0 4px var(--accent))' }}
      />
      <polygon points="50,20 52,25 58,25 53,28 55,34 50,30 45,34 47,28 42,25 48,25" fill="var(--fg)" stroke="none" />
    </svg>
  );
}
