import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipIconProps = {
  text: string;
  icon: ReactNode; // O ícone pode ser qualquer ReactNode (ex: imagem, SVG, ícone de biblioteca)
};

export function TooltipIcon({ text, icon }: TooltipIconProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-pointer">{icon}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-black text-white p-2 rounded-md shadow-md">
            {text}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

