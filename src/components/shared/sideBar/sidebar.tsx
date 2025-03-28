import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right";
  width?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  closeButton?: React.ReactNode | string;
  closeButtonClassName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  position = "right",
  width = "lg",
  children,
  title,
  description,
  closeButton = <X size={18} />,
  closeButtonClassName,
}) => {
  const { motion, AnimatePresence } = useMotion();

  const widthClasses = {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
  };

  const sidebarVariants = {
    hidden: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "fixed bg-background border-l shadow-lg overflow-auto z-50",
          position === "right" ? "right-0 border-l" : "left-0 border-r",
          widthClasses[width as keyof typeof widthClasses] || widthClasses.md
        )}
        initial="hidden"
        animate={open ? "visible" : "exit"} // Control animation based on `open`
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-screen">
          <div className="flex p-3 border-b border-muted-bg justify-between items-center">
            <div>
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <button
              className={cn(
                "rounded-md flex items-center justify-center",
                closeButtonClassName
              )}
              onClick={onClose}
              aria-label={closeButton ? undefined : "Close sidebar"}
            >
              {closeButton}
            </button>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
