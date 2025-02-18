import { ReactNode } from "react";

type TooltipIconProps = {
  text: string;
  icon: ReactNode; // O ícone pode ser qualquer ReactNode (ex: imagem, SVG, ícone de biblioteca)
};

export function TooltipIcon({ text, icon }: TooltipIconProps) {
  return (
    <div className="relative inline-block group">
      <span className="cursor-pointer">{icon}</span>
      <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-black text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </span>
    </div>
  );
}
