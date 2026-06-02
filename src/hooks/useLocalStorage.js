// src/hooks/useLocalStorage.js
import { useState } from 'react';

/**
 * React hook backed by localStorage. Same API as useState.
 *
 * - Lazy init: reads localStorage exactly once on mount.
 * - Write-through: every setValue call updates both React state and localStorage.
 * - Graceful degradation: unavailable storage or bad JSON → falls back to initialValue, silent.
 * - Functional updater support: setValue(prev => newValue) works correctly.
 *
 * Keys must be namespaced (e.g. 'moodbite_favorites') to avoid collisions on shared origins.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // null means key was never set — return initialValue, not JSON.parse(null)
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      // Catches: SecurityError (private browsing), SyntaxError (corrupted JSON)
      // Silent failure is intentional. Return initialValue. App runs without persistence.
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // Catches: QuotaExceededError (storage full), SecurityError (mid-session block)
      // State was already updated above — UI is correct for this session. Storage unchanged.
    }
  };

  return [storedValue, setValue];
}
