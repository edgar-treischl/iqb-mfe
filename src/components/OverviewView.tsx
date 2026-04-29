import { getOverallData, groupDataForChart, STUFEN_COLORS, type Bereich, BEREICHE } from '../iqb.ts'
import { StackedBarChart } from './StackedBarChart.tsx'
import { HelpPopup } from './HelpPopup.tsx'
import './OverviewView.css'

const BEREICH_DESCRIPTIONS: Record<Bereich, string> = {
  Lesen:
    'Die Lesekompetenz umfasst die Fähigkeit, geschriebene Texte zu verstehen, zu nutzen und über sie zu reflektieren, um eigene Ziele zu erreichen und das eigene Wissen weiterzuentwickeln.',
  Orthografie:
    'Die orthografische Kompetenz bezieht sich auf die Fähigkeit, Wörter, Sätze und Texte normgerecht zu schreiben. Dies umfasst die Kenntnis und Anwendung von Rechtschreibregeln.',
  Zuhören:
    'Die Zuhörkompetenz umfasst die Fähigkeit, gesprochene Texte zu verstehen und zu verarbeiten. Dies beinhaltet das Erfassen von Hauptaussagen sowie von Details.',
}

const HELP_CONTENT = (
  <>
    <p>
      Diese Grafiken zeigen die <strong>Kompetenzstufenverteilung</strong> für Bayern und
      Deutschland (insgesamt) in den drei getesteten Bereichen.
    </p>
    <p>
      <strong>Kompetenzstufen:</strong>
    </p>
    <ul>
      <li>
        <strong>V:</strong> Optimalstandard (höchste Stufe)
      </li>
      <li>
        <strong>IV:</strong> Regelstandard Plus
      </li>
      <li>
        <strong>III:</strong> Regelstandard
      </li>
      <li>
        <strong>II:</strong> Mindeststandard Plus
      </li>
      <li>
        <strong>Ib:</strong> Mindeststandard
      </li>
      <li>
        <strong>Ia:</strong> Unter Mindeststandard
      </li>
    </ul>
    <p>Die Prozentangaben zeigen den Anteil der Schülerinnen und Schüler auf jeder Stufe.</p>
  </>
)

export function OverviewView() {
  const overallData = getOverallData()

  return (
    <div className="overview-view">
      <div className="overview-intro">
        <div className="overview-intro-text">
          <p>
            Die folgenden Grafiken zeigen die Kompetenzstufenverteilung in der Jahrgangsstufe 9 im
            Fach Deutsch im IQB-Bildungstrend 2022 für <strong>Bayern</strong> und{' '}
            <strong>Deutschland</strong> (insgesamt).
          </p>
          <p className="note">
            <strong>Anmerkung:</strong> Werte kleiner 5 % werden in den Grafiken nicht ausgewiesen.
          </p>
        </div>
        <HelpPopup title="Erläuterungen zur Übersicht" content={HELP_CONTENT} />
      </div>

      <div className="overview-charts">
        {BEREICHE.map((bereich) => {
          const bereichData = overallData.filter((d) => d.bereich === bereich)
          const groups = groupDataForChart(bereichData, { showBulaInLabel: true })

          return (
            <div key={bereich} className="overview-chart-item">
              <div className="chart-description">
                <h3>{bereich}</h3>
                <p>{BEREICH_DESCRIPTIONS[bereich]}</p>
              </div>
              <div className="chart-container">
                <StackedBarChart groups={groups} showLegend={false} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="overview-legend-container">
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

      <div className="overview-footer">
        <p className="caption">
          <strong>Quelle:</strong> IQB-Bildungstrend 2022 in der Sekundarstufe I
        </p>
      </div>
    </div>
  )
}
