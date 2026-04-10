import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/inputs.css";

export type WiXSelectOption =
  | string
  | {
      label: string;
      value: string;
      description?: string;
      icon?: string;
      disabled?: boolean;
    };

export interface WiXSelectResolvedOption {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

interface WiXSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: WiXSelectOption[];
  placeholder: string;
  icon?: string;
  label?: string;
  name?: string;
  id?: string;
  required?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  containerClassName?: string;
  triggerClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  className?: string;
  renderOption?: (
    option: WiXSelectResolvedOption,
    active: boolean,
  ) => React.ReactNode;
  renderValue?: (option?: WiXSelectResolvedOption) => React.ReactNode;
}

function normalizeOption(option: WiXSelectOption): WiXSelectResolvedOption {
  if (typeof option === "string") {
    return { label: option, value: option };
  }

  return option;
}

function WiXSelect({
  value,
  onValueChange,
  options,
  placeholder,
  icon = "angle-down",
  label,
  name,
  id,
  required = true,
  searchable = false,
  disabled = false,
  emptyMessage = "No options found.",
  containerClassName = "",
  triggerClassName = "",
  menuClassName = "",
  optionClassName = "",
  className = "",
  renderOption,
  renderValue,
}: WiXSelectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useState(false);

  const normalizedOptions = useMemo(
    () => options.map(normalizeOption),
    [options],
  );

  const selectedOption = useMemo(
    () => normalizedOptions.find((option) => option.value === value),
    [normalizedOptions, value],
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || searchTerm.trim() === "") {
      return normalizedOptions;
    }

    const term = searchTerm.trim().toLowerCase();
    return normalizedOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(term) ||
        option.value.toLowerCase().includes(term) ||
        (option.description || "").toLowerCase().includes(term),
    );
  }, [normalizedOptions, searchable, searchTerm]);

  const shouldShowError = touched && (required ? !selectedOption : false);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActive(false);
        if (!searchable) {
          setSearchTerm("");
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchable]);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
    setActive(true);
    if (!open && searchable) {
      setSearchTerm("");
    }
  };

  const handleSelect = (option: WiXSelectResolvedOption) => {
    if (option.disabled) return;
    onValueChange(option.value);
    setOpen(false);
    setActive(false);
    setTouched(true);
    setSearchTerm("");
  };

  const renderDefaultOption = (option: WiXSelectResolvedOption) => (
    <div className="wix-select-option-content">
      <strong>{option.label}</strong>
      {option.description ? <small>{option.description}</small> : null}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={`wix-select-shell ${shouldShowError ? "incorrect" : ""} ${containerClassName}`.trim()}
    >
      {label ? <p className="wix-select-label">{label}</p> : null}
      <button
        id={id}
        name={name}
        type="button"
        className={`wix-select-trigger ${className} ${triggerClassName}`.trim()}
        onClick={toggleOpen}
        onBlur={() => setTouched(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={shouldShowError}
        disabled={disabled}
      >
        <span className="wix-select-trigger-left">
          <i className={`fas fa-${icon}`}></i>
          {renderValue ? (
            renderValue(selectedOption)
          ) : (
            <span
              className={`wix-select-trigger-value ${selectedOption ? "selected" : "placeholder"}`.trim()}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
        </span>
        <i className={`fas fa-chevron-${open ? "up" : "down"} chevron`}></i>
      </button>

      {open ? (
        <div
          className={`wix-select-menu ${menuClassName}`.trim()}
          role="listbox"
        >
          {searchable ? (
            <div className="wix-select-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                value={searchTerm}
                placeholder={`Search ${placeholder.toLowerCase()}`}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          ) : null}

          <div className="wix-select-options">
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const isActive = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`wix-select-option ${isActive ? "active" : ""} ${option.disabled ? "disabled" : ""} ${optionClassName}`.trim()}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={isActive}
                  >
                    {renderOption
                      ? renderOption(option, isActive)
                      : renderDefaultOption(option)}
                  </button>
                );
              })
            ) : (
              <div className="wix-select-empty">{emptyMessage}</div>
            )}
          </div>
        </div>
      ) : null}

      {active && shouldShowError ? (
        <div className="wix-select-error">
          <i className="fas fa-close"></i>
          <small>Please select a valid option.</small>
        </div>
      ) : null}
    </div>
  );
}

export default WiXSelect;
