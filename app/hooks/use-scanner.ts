import { useDebounceFn } from "ahooks";
import { trim } from "lodash";
import { useEffect, useRef } from "react";

export function useScannerByGun(onSuccess: (code: string) => void) {
  const codeRef = useRef<string>("");
  const flagRef = useRef<any>(null);

  const scanner = useDebounceFn(
    (v) => {
      onSuccess(trim(v));
    },
    { wait: 30 },
  );

  const resetScan = useDebounceFn(
    () => {
      codeRef.current = "";
    },
    { wait: 30 },
  );

  useEffect(() => {
    const keypressHandler = (e: any) => {
      if (e.key === "Enter") {
        scanner.run(codeRef.current);
        codeRef.current = "";
      } else {
        codeRef.current += e.key;
        resetScan.run();
      }
    };

    window.addEventListener("keypress", keypressHandler);

    return () => {
      window.removeEventListener("keypress", keypressHandler);

      if (flagRef.current != null) {
        clearTimeout(flagRef.current);
        flagRef.current = null;
      }
    };
  }, []);
}
