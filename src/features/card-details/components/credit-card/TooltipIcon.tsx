import { Info } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface TooltipIconProps {
  id?: string;
  content?: string;
  text?: string;
  icon?: React.ReactNode;
}

export const TooltipIcon = ({ id = 'tooltip', content, text, icon }: TooltipIconProps) => {
  const tooltipContent = content || text || '';
  
  return (
    <>
      {icon || <Info
        data-tooltip-id={id}
        data-tooltip-content={tooltipContent}
        className="w-4 h-4 text-gray-400 cursor-help"
      />}
      <Tooltip id={id} />
    </>
  );
}; 