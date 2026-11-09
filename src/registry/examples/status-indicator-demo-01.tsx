"use client";

import { TbCloudUpload, TbCreditCard, TbSend } from "react-icons/tb";

import { showStatusIndicator } from "@/registry/status-indicator/status-indicator";

/**
 * Basic Status Indicator Demo
 * Shows the core functionality with default styling
 */
export default function StatusIndicatorDemo01() {
  const handlePayment = () => {
    showStatusIndicator({
      icon: <TbCreditCard strokeWidth={2.5} className="size-5" />,
      label: "Pay $49.99",
      text: {
        loading: "Processing Payment",
        success: "Payment Complete",
        error: "Payment Failed",
      },
    });
  };

  const handleSendMessage = () => {
    showStatusIndicator({
      icon: <TbSend strokeWidth={2.5} className="size-5" />,
      label: "Send Message",
      text: {
        loading: "Sending Message",
        success: "Message Sent",
        error: "Send Failed",
      },
      simulationDuration: 1500,
      successRate: 0.9,
    });
  };

  const handleUpload = () => {
    showStatusIndicator({
      icon: <TbCloudUpload strokeWidth={2.5} className="size-5" />,
      label: "Upload Files",
      text: {
        loading: "Uploading Files",
        success: "Upload Complete",
        error: "Upload Failed",
      },
      simulationDuration: 2500,
      successRate: 0.8,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-sm text-muted-foreground">
        Click to trigger Status Indicator toast
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePayment}
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent active:scale-95"
        >
          <TbCreditCard className="size-4" />
          Pay $49.99
        </button>

        <button
          onClick={handleSendMessage}
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent active:scale-95"
        >
          <TbSend className="size-4" />
          Send Message
        </button>

        <button
          onClick={handleUpload}
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent active:scale-95"
        >
          <TbCloudUpload className="size-4" />
          Upload Files
        </button>
      </div>
    </div>
  );
}
