import { useState } from 'react'
import {
  filterData,
  groupDataForChart,
  type BulaFilter,
  type BereichFilter,
  type TeilpopFilter,
  BUNDESLAENDER,
  BEREICHE,
  TEILPOP_LABELS,
  STUFEN_COLORS,
  type Teilpop,
  type Bereich,
} from '../iqb.ts'
import { StackedBarChart } from './StackedBarChart.tsx'
import { HelpPopup } from './HelpPopup.tsx'
import './ResultsView.css'

const BEREICH_DESCRIPTIONS: Record<Bereich, { title: string; description: string; interpretation: string }> = {
  Lesen: {
    title: 'Lesekompetenz',
    description:
      'Die Lesekompetenz umfasst die Fähigkeit, geschriebene Texte zu verstehen, zu nutzen und über sie zu reflektieren, um eigene Ziele zu erreichen und das eigene Wissen weiterzuentwickeln.',
    interpretation:
      'Die Grafik zeigt, wie sich die Schülerinnen und Schüler auf die verschiedenen Kompetenzstufen verteilen. Höhere Anteile in den Stufen IV und V weisen auf überdurchschnittliche Lesefähigkeiten hin.',
  },
  Orthografie: {
    title: 'Orthografische Kompetenz',
    description:
      'Die orthografische Kompetenz bezieht sich auf die Fähigkeit, Wörter, Sätze und Texte normgerecht zu schreiben. Dies umfasst die Kenntnis und Anwendung von Rechtschreibregeln.',
    interpretation:
      'Besonders in höheren Schulformen (z.B. Gymnasium) zeigen sich deutliche Unterschiede in der Verteilung. Die Stufen IV und V kennzeichnen sichere Rechtschreibkompetenz.',
  },
  Zuhören: {
    title: 'Zuhörkompetenz',
    description:
      'Die Zuhörkompetenz umfasst die Fähigkeit, gesprochene Texte zu verstehen und zu verarbeiten. Dies beinhaltet das Erfassen von Hauptaussagen sowie von Details.',
    interpretation:
      'Zuhören ist eine zentrale Schlüsselkompetenz für das Lernen. Die Verteilung zeigt, wie gut Schülerinnen und Schüler in der Lage sind, mündlich übermittelte Informationen zu erfassen.',
  },
}

const HELP_CONTENT = (
  <>
    <p>
      Diese Ansicht ermöglicht eine <strong>detaillierte Analyse</strong> der
      Kompetenzstufenverteilung nach verschiedenen Kriterien.
    </p>
    <p>
      <strong>Filter-Optionen:</strong>
    </p>
    <ul>
      <li>
        <strong>Bundesland:</strong> Vergleich zwischen Bayern und Deutschland oder nur ein
        Bundesland
      </li>
      <li>
        <strong>Bereich:</strong> Auswahl des getesteten Kompetenzbereichs
      </li>
      <li>
        <strong>Teilpopulation:</strong> Differenzierung nach Schulform oder Abschlussart
      </li>
    </ul>
    <p>
      Die Grafiken zeigen die prozentuale Verteilung der Schülerinnen und Schüler auf die sechs
      Kompetenzstufen (Ia bis V).
    </p>
  </>
)

export function ResultsView() {
  const [bulaFilter, setBulaFilter] = useState<BulaFilter>('Alle')
  const [bereichFilter, setBereichFilter] = useState<BereichFilter>('Lesen')
  const [teilpopFilter, setTeilpopFilter] = useState<TeilpopFilter>('Alle')

  const filteredData = filterData(bulaFilter, bereichFilter, teilpopFilter)
  const groups = groupDataForChart(filteredData)

  const currentBereichInfo = BEREICH_DESCRIPTIONS[bereichFilter as Bereich]

  return (
    <div className="results-view">
      <div className="results-header">
        <div className="results-header-text">
          <h2>Detaillierte Ergebnisse</h2>
          <p>Wählen Sie die gewünschten Filter, um spezifische Teilgruppen zu betrachten.</p>
        </div>
        <HelpPopup title="Erläuterungen zu den Detailergebnissen" content={HELP_CONTENT} />
      </div>

      <div className="results-content">
        <div className="results-chart-section">
          <h3 className="chart-title">{currentBereichInfo?.title || bereichFilter}</h3>

          <div className="results-filters">
            <div className="filter-group">
              <label htmlFor="bereich-filter">Bereich:</label>
              <select
                id="bereich-filter"
                value={bereichFilter}
                onChange={(e) => setBereichFilter(e.target.value as BereichFilter)}
              >
                {BEREICHE.map((bereich) => (
                  <option key={bereich} value={bereich}>
                    {bereich}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="bula-filter">Analyseeinheit:</label>
              <select
                id="bula-filter"
                value={bulaFilter}
                onChange={(e) => setBulaFilter(e.target.value as BulaFilter)}
              >
                <option value="Alle">Alle</option>
                {BUNDESLAENDER.map((bula) => (
                  <option key={bula} value={bula}>
                    {bula}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="teilpop-filter">Gruppe:</label>
              <select
                id="teilpop-filter"
                value={teilpopFilter}
                onChange={(e) => setTeilpopFilter(e.target.value as TeilpopFilter)}
              >
                <option value="Alle">Alle</option>
                <option value="Ohne Insgesamt">Ohne Insgesamt</option>
                {(Object.keys(TEILPOP_LABELS) as Teilpop[]).map((teilpop) => (
                  <option key={teilpop} value={teilpop}>
                    {TEILPOP_LABELS[teilpop]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-wrapper">
            {groups.length > 0 ? (
              <StackedBarChart groups={groups} showLegend={false} />
            ) : (
              <div className="chart-empty">
                <p>Keine Daten für die gewählten Filter verfügbar.</p>
              </div>
            )}
          </div>

          {groups.length > 0 && (
            <div className="results-legend">
              <div className="chart-legend">
                <div className="legend-title">Kompetenzstufe:</div>
                <div className="legend-items">
                  {['V', 'IV', 'III', 'II', 'Ib', 'Ia'].map((stufe) => (
                    <div key={stufe} className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: STUFEN_COLORS[stufe as keyof typeof STUFEN_COLORS] }}
                      />
                      <span>{stufe}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="results-info-section">
          <div className="info-card">
            <h4>Beschreibung</h4>
            <p>{currentBereichInfo?.description}</p>
          </div>

          <div className="info-card">
            <h4>Interpretation</h4>
            <p>{currentBereichInfo?.interpretation}</p>
          </div>

          <div className="info-card">
            <h4>Aktuelle Auswahl</h4>
            <dl className="selection-summary">
              <dt>Bereich:</dt>
              <dd>{bereichFilter}</dd>
              <dt>Analyseeinheit:</dt>
              <dd>{bulaFilter}</dd>
              <dt>Gruppe:</dt>
              <dd>
                {teilpopFilter === 'Alle'
                  ? 'Alle'
                  : teilpopFilter === 'Ohne Insgesamt'
                    ? 'Ohne Insgesamt'
                    : TEILPOP_LABELS[teilpopFilter as Teilpop]}
              </dd>
              <dt>Anzahl Gruppen:</dt>
              <dd>{groups.length}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="results-footer">
        <p className="caption">
          <strong>Quelle:</strong> IQB-Bildungstrend 2022 in der Sekundarstufe I
        </p>
      </div>
    </div>
  )
}
