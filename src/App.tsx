import { useState } from 'react'
import { OverviewView } from './components/OverviewView.tsx'
import { ResultsView } from './components/ResultsView.tsx'
import { DataDescriptionView } from './components/DataDescriptionView.tsx'
import './App.css'

const VIEW_OPTIONS = [
  { key: 'overview', label: 'Übersicht' },
  { key: 'results', label: 'Detailergebnisse' },
  { key: 'data', label: 'Datenbeschreibung' },
] as const

type ViewKey = (typeof VIEW_OPTIONS)[number]['key']

const VIEW_TITLES: Record<ViewKey, string> = {
  overview: 'Übersicht',
  results: 'Detailergebnisse',
  data: 'Datenbeschreibung',
}

export default function App() {
  const [view, setView] = useState<ViewKey>('overview')

  return (
    <main className="iqb-app">
      <section className="panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">IQB-Bildungstrend 2022</p>
            <h1>{VIEW_TITLES[view]}</h1>
          </div>
          <div className="summary-chip">
            <strong>Deutsch</strong>
            <span>Jahrgangsstufe 9</span>
          </div>
        </header>

        <nav className="view-switch" aria-label="View selector">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              className={option.key === view ? 'view-tab is-active' : 'view-tab'}
              onClick={() => setView(option.key)}
            >
              {option.label}
            </button>
          ))}
        </nav>

        <div className="view-content">
          {view === 'overview' && <OverviewView />}
          {view === 'results' && <ResultsView />}
          {view === 'data' && <DataDescriptionView />}
        </div>
      </section>
    </main>
  )
}
