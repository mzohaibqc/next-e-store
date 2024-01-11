type ColorProps = {
  color: string;
};

const colorMap: Record<string, string> = {
  Black: '#000000',
  Red: '#FF0000',
  Stone: '#EFCFB6',
};

export default function Color({ color }: ColorProps) {
  return (
    <div
      className="w-6 h-6 rounded-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      style={{ backgroundColor: colorMap[color] || color }}
    >
      <span className="sr-only color-value">{color}</span>
    </div>
  );
}
