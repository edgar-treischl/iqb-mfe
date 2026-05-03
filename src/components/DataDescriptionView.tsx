import './DataDescriptionView.css'

export function DataDescriptionView() {
  return (
    <div className="data-description-view">
      {/* LEFT COLUMN */}
      <div className="column left">
        
        <div className="description-section">
          <h2>Über den IQB-Bildungstrend 2022</h2>
          <p>
            Der IQB-Bildungstrend ist eine regelmäßige Untersuchung des Instituts zur
            Qualitätsentwicklung im Bildungswesen (IQB), die überprüft, inwieweit Schülerinnen und
            Schüler die nationalen Bildungsstandards erreichen.
          </p>
          <p>
            Die hier dargestellten Daten stammen aus dem IQB-Bildungstrend 2022 für das Fach Deutsch
            in der Jahrgangsstufe 9 (Sekundarstufe I).
          </p>
        </div>

                <div className="description-section">
          <h2>Getestete Bereiche</h2>

          <div className="domain-list">
            
            <div className="domain-item">
              <h4>Lesen</h4>
              <p>
                Die Lesekompetenz umfasst die Fähigkeit, geschriebene Texte zu verstehen, zu nutzen
                und über sie zu reflektieren, um eigene Ziele zu erreichen und das eigene Wissen
                weiterzuentwickeln.
              </p>
            </div>

            <div className="domain-item">
              <h4>Orthografie</h4>
              <p>
                Die orthografische Kompetenz bezieht sich auf die Fähigkeit, Wörter, Sätze und Texte
                normgerecht zu schreiben. Dies umfasst die Kenntnis und Anwendung von
                Rechtschreibregeln.
              </p>
            </div>

            <div className="domain-item">
              <h4>Zuhören</h4>
              <p>
                Die Zuhörkompetenz umfasst die Fähigkeit, gesprochene Texte zu verstehen und zu
                verarbeiten. Dies beinhaltet das Erfassen von Hauptaussagen sowie von Details.
              </p>
            </div>
          </div>
        </div>
        
        
        <div className="description-section">
          <h2>Teilpopulationen</h2>
          <p>Die Daten werden für verschiedene Schulformen differenziert ausgewiesen:</p>

          <ul className="population-list">
            <li>
              <strong>Insgesamt:</strong> Alle Schülerinnen und Schüler der Jahrgangsstufe 9
            </li>
            <li>
              <strong>Mittlerer Schulabschluss (MSA):</strong> Schülerinnen und Schüler, die den
              Mittleren Schulabschluss anstreben
            </li>
            <li>
              <strong>Gymnasium:</strong> Schülerinnen und Schüler an Gymnasien
            </li>
            <li>
              <strong>Allgemeine Hochschulreife:</strong> Schülerinnen und Schüler, die die
              Allgemeine Hochschulreife anstreben
            </li>
          </ul>
        </div>


      </div>

      {/* RIGHT COLUMN */}
      <div className="column right">
                <div className="description-section">
          <h2>Kompetenzstufen</h2>
          <p>
            Die Leistungen der Schülerinnen und Schüler werden anhand von sechs Kompetenzstufen
            beschrieben:
          </p>

          <div className="competency-levels">
            <div className="level-item">
              <div className="level-badge level-v">V</div>
              <div className="level-content">
                <h4>Optimalstandard</h4>
                <p>
                  Schülerinnen und Schüler erreichen den Optimalstandard und zeigen
                  überdurchschnittliche Leistungen.
                </p>
              </div>
            </div>

            <div className="level-item">
              <div className="level-badge level-iv">IV</div>
              <div className="level-content">
                <h4>Regelstandard Plus</h4>
                <p>Die Anforderungen des Regelstandards werden deutlich übertroffen.</p>
              </div>
            </div>

            <div className="level-item">
              <div className="level-badge level-iii">III</div>
              <div className="level-content">
                <h4>Regelstandard</h4>
                <p>
                  Schülerinnen und Schüler erfüllen die Anforderungen des Regelstandards.
                </p>
              </div>
            </div>

            <div className="level-item">
              <div className="level-badge level-ii">II</div>
              <div className="level-content">
                <h4>Mindeststandard Plus</h4>
                <p>
                  Die Anforderungen des Mindeststandards werden übertroffen, der Regelstandard aber
                  noch nicht erreicht.
                </p>
              </div>
            </div>

            <div className="level-item">
              <div className="level-badge level-ib">Ib</div>
              <div className="level-content">
                <h4>Mindeststandard</h4>
                <p>Schülerinnen und Schüler erfüllen die Mindestanforderungen.</p>
              </div>
            </div>

            <div className="level-item">
              <div className="level-badge level-ia">Ia</div>
              <div className="level-content">
                <h4>Unter Mindeststandard</h4>
                <p>Die Mindestanforderungen werden nicht erreicht.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="description-section source-section">
          <h2>Quelle</h2>
          <p>
            Die Daten stammen aus dem IQB-Bildungstrend 2022 in der Sekundarstufe I und werden vom
            Institut zur Qualitätsentwicklung im Bildungswesen (IQB) bereitgestellt.
          </p>
          <p>
            Weitere Informationen finden Sie unter{' '}
            <a
              href="https://www.iqb.hu-berlin.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.iqb.hu-berlin.de
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}