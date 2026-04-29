import { useState } from 'react'
import './HelpPopup.css'

type HelpPopupProps = {
  title: string
  content: string | React.ReactNode
}

export function HelpPopup({ title, content }: HelpPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="help-popup-container">
      <button
        className="help-icon-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hilfe anzeigen"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 14V14.01M10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="help-popup-overlay" onClick={() => setIsOpen(false)} />
          <div className="help-popup-dialog">
            <div className="help-popup-header">
              <h3>{title}</h3>
              <button
                className="help-popup-close"
                onClick={() => setIsOpen(false)}
                aria-label="Schließen"
                type="button"
              >
                ×
              </button>
            </div>
            <div className="help-popup-content">{content}</div>
          </div>
        </>
      )}
    </div>
  )
}
