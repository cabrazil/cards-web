import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipIconProps = {
  text: string | string[];
  icon: ReactNode; // O ícone pode ser qualquer ReactNode (ex: imagem, SVG, ícone de biblioteca)
};

export function TooltipIcon({ text, icon }: TooltipIconProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-pointer text-white">{icon}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-[#4169e1] text-white p-2 rounded-md shadow-md whitespace-pre-wrap max-w-md break-words">
            {text}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

