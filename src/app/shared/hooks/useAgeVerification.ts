import { useState, useEffect } from "react";

export const useAgeVerification = () => {
  const [showAgeVerify, setShowAgeVerify] = useState(false);
  const [showSorry, setShowSorry] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      setShowAgeVerify(true);
    }
    if (ageVerified === "false") {
      setShowSorry(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setShowAgeVerify(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ageVerified", "false");
    setShowAgeVerify(false);
    setShowSorry(true);
  };

  return {
    showAgeVerify,
    showSorry,
    handleConfirm,
    handleDecline,
  };
};
