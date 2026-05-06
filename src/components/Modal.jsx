import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} scale-in max-h-[90vh] overflow-y-auto`}>
        {/* Header with gradient accent */}
        <div className="flex items-center justify-between p-6 border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent-secondary/5">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-danger/20 rounded-lg transition text-muted hover:text-danger duration-200 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
