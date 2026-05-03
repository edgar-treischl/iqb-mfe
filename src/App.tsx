import { useState } from 'react'
import { OverviewView } from './components/OverviewView.tsx'
import { ResultsView } from './components/ResultsView.tsx'
import { DataDescriptionView } from './components/DataDescriptionView.tsx'
import './App.css'

const VIEW_OPTIONS = [
  { key: 'data', label: 'Daten' },
  { key: 'overview', label: 'Hauptergebnisse' },
  { key: 'results', label: 'Detailergebnisse' },
] as const

type ViewKey = (typeof VIEW_OPTIONS)[number]['key']

const VIEW_TITLES: Record<ViewKey, string> = {
  data: 'Daten',
  overview: 'Hauptergebnisse',
  results: 'Detailergebnisse',
}

export default function App() {
  const [view, setView] = useState<ViewKey>('overview')

  return (
    <main className="iqb-app">
      <section className="iqb-app__panel">
        <header className="iqb-app__hero">
          <div>
            <p className="iqb-app__eyebrow">IQB-Bildungstrend</p>
            <h1 className="iqb-app__title">{VIEW_TITLES[view]}</h1>
          </div>
          <div className="iqb-app__status">
            <strong>Deutsch: </strong>
            <span>Jahrgangsstufe 9</span>
          </div>
        </header>

        <nav className="iqb-app__tabs" aria-label="View selector">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              className={option.key === view ? 'iqb-app__tab iqb-app__tab--active' : 'iqb-app__tab'}
              onClick={() => setView(option.key)}
            >
              {option.label}
            </button>
          ))}
        </nav>

        <div className="iqb-app__content">
          {view === 'data' && <DataDescriptionView />}
          {view === 'overview' && <OverviewView />}
          {view === 'results' && <ResultsView />}
        </div>
      </section>
    </main>
  )
}
