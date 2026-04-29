
iqb_data <- tibble::tribble(
                      ~bula, ~p_Ia, ~p_Ib, ~p_II, ~p_III, ~p_IV, ~p_V,           ~tab,      ~bereich,                    ~teilpop,
                   "Bayern",  11.5,  15.1,    25,   29.2,  14.9,  4.3,  "Tab. 3.1web",       "Lesen",                      "alle",
              "Deutschland",  15.2,  17.3,  26.9,   25.2,  12.3,  3.1,  "Tab. 3.1web",       "Lesen",                      "alle",
                   "Bayern",   3.7,  11.2,  25.5,   35.5,  18.7,  5.4,  "Tab. 3.4web",       "Lesen",                       "MSA",
              "Deutschland",     8,  14.8,  28.6,   29.8,    15,  3.9,  "Tab. 3.4web",       "Lesen",                       "MSA",
                   "Bayern",   0.5,   2.2,  12.8,   38.1,  33.9, 12.5,  "Tab. 3.7web",       "Lesen",                 "Gymnasium",
              "Deutschland",   1.5,   5.3,  20.8,     38,  26.5,  7.9,  "Tab. 3.7web",       "Lesen",                 "Gymnasium",
                   "Bayern",   0.5,   2.2,  12.7,   38.1,    34, 12.6, "Tab. 3.10web",       "Lesen", "Allgemeine Hochschulreife",
              "Deutschland",   2.5,   6.7,  22.4,   36.8,  24.5,  7.1, "Tab. 3.10web",       "Lesen", "Allgemeine Hochschulreife",
                   "Bayern",   6.2,  10.7,  18.4,   32.7,  25.5,  6.4,  "Tab. 3.3web", "Orthografie",                      "alle",
              "Deutschland",   7.9,  14.4,  22.2,   30.5,  19.1,  5.9,  "Tab. 3.3web", "Orthografie",                      "alle",
                   "Bayern",   1.1,   5.9,    16,   37.3,  31.6,  8.1,  "Tab. 3.6web", "Orthografie",                       "MSA",
              "Deutschland",   3.2,  10.2,  21.4,   34.8,  23.2,  7.2,  "Tab. 3.6web", "Orthografie",                       "MSA",
                   "Bayern",   0.3,     1,   5.3,   29.6,  48.1, 15.7,  "Tab. 3.9web", "Orthografie",                 "Gymnasium",
              "Deutschland",   0.4,   2.1,   9.9,   35.1,  38.1, 14.3,  "Tab. 3.9web", "Orthografie",                 "Gymnasium",
                   "Bayern",   0.3,     1,   5.2,   29.6,  48.1, 15.8, "Tab. 3.12web", "Orthografie", "Allgemeine Hochschulreife",
              "Deutschland",   0.9,   3.3,  12.1,   35.4,  35.4, 12.9, "Tab. 3.12web", "Orthografie", "Allgemeine Hochschulreife",
                   "Bayern",  13.4,  14.4,  19.6,     28,  16.7,  7.8,  "Tab. 3.2web",     "Zuhören",                      "alle",
              "Deutschland",  17.6,  16.8,    21,   24.3,  13.8,  6.5,  "Tab. 3.2web",     "Zuhören",                      "alle",
                   "Bayern",   6.3,  11.4,  19.3,   32.6,  20.6,  9.8,  "Tab. 3.5web",     "Zuhören",                       "MSA",
              "Deutschland",  10.4,  14.9,  21.8,   28.3,  16.7,  7.9,  "Tab. 3.5web",     "Zuhören",                       "MSA",
                   "Bayern",   0.9,   3.7,   9.8,   32.4,  32.7, 20.6,  "Tab. 3.8web",     "Zuhören",                 "Gymnasium",
              "Deutschland",     2,   5.7,  15.3,   33.5,    28, 15.6,  "Tab. 3.8web",     "Zuhören",                 "Gymnasium",
                   "Bayern",   0.8,   3.6,   9.8,   32.3,  32.7, 20.7, "Tab. 3.11web",     "Zuhören", "Allgemeine Hochschulreife",
              "Deutschland",   3.1,   7.1,  16.6,   33.1,  26.1, 14.1, "Tab. 3.11web",     "Zuhören", "Allgemeine Hochschulreife"
              )



tmp <- iqb_data |> 
  #dplyr::filter(teilpop != "Gymnasium") |>
  #dplyr::filter(bula == "Bayern") |> 
  dplyr::select(
    bula, teilpop, bereich, contains("p_")
  ) |>
  tidyr::pivot_longer(
    p_Ia:p_V,
    names_to = "Stufe",
    values_to = "P"
  ) |>
  dplyr::mutate(
    teilpop = factor(
      teilpop,
      levels = c("Allgemeine Hochschulreife", "MSA", "Gymnasium", "alle"),
      labels = c("Allgemeine Hochschulreife", "Mittlerer Schulabschluss", "Gymnasium", "Insgesamt")
    ),
    Stufe = Stufe |>
      stringr::str_remove_all("p_"),
    Stufe = factor(
      Stufe,
      levels = c("V", "IV", "III", "II", "Ib", "Ia"),
      labels = c("V", "VI", "III", "II", "Ib", "Ia")
    ),
    label = dplyr::case_when(
      P < 5 ~ "",
      T ~ paste0(stringr::str_replace(P, stringr::fixed("."), ","))
    )
  )

# Task 01: Include this as a static plot component
plot_overall <- tmp |> 
  dplyr::mutate(teilpop2 = paste0(bula, "\n(", "insg.", ")" )) |> 
  dplyr::filter(teilpop == "Insgesamt") |> 
  ggplot2::ggplot(ggplot2::aes(x = teilpop2, y = P, fill=Stufe)) +
  ggplot2::geom_bar(stat="identity", position = "fill") +
  ggplot2::geom_text(
    ggplot2::aes(label = label),
    size = 3,
    position= ggplot2::position_fill(vjust=0.5),
    colour=rep(c("white","white","#737373","#737373","white","white"),6)
  ) +
  ggplot2::coord_flip() +
  ggplot2::facet_wrap(bereich ~ ., ncol = 1) +
  ggplot2::scale_fill_manual(
    values=c('#01665e', '#5ab4ac', '#c7eae5','#f6e8c3', '#d8b365', '#8c510a'),
    guide = ggplot2::guide_legend(
      reverse = TRUE,
      nrow = 1
    )
  ) +
  ggplot2::scale_y_continuous(
    labels = scales::percent,
    expand = c(0,0)
  ) +
  ggplot2::theme_minimal()+
  ggplot2::theme(
    legend.position='bottom',
    legend.direction = "horizontal") +
  ggplot2::labs(
    x = '',
    y = 'Anteil in %',
    title = 'Abbildung F1.1',
    subtitle = 'Kompetenzstufenverteilung in der Jahrgangsstufe 9 im Fach Deutsch im IQB-Bildungstrend 2022',
    caption = 'Anmerkung: Werte kleiner 5 % werden in der Grafik nicht ausgewiesen.\nQuelle: IQB-Bildungstrend 2022 in der Sekundarstufe I'
  )



plot_overall


# Task 02: Create a faceted plot with the same structure as above, but:
# Let User pick bula: A) All; B) Bayern Only
# Let User pick bereich: A) Lesen; B) Orthografie; C) Zuhören
# Let User pick teilpop: A) All; B) Exclude "Insgesamt" 


tmp |> 
  #dplyr::filter(bula == "Bayern") |> 
  #dplyr::filter(teilpop != "Insgesamt") |>
  dplyr::mutate(bereich2 = paste0(bereich, "\n(", bula, ")" )) |>
  ggplot2::ggplot(ggplot2::aes(x = teilpop, y = P, fill=Stufe)) +
  ggplot2::geom_bar(stat="identity", position ="fill") +
  ggplot2::geom_text(
    ggplot2::aes(label = label),
    size = 3,
    position= ggplot2::position_fill(vjust=0.5),
    colour=rep(c("white","white","#737373","#737373","white","white"), 24)
  ) +
  ggplot2::coord_flip() +
  ggplot2::facet_wrap(bereich2 ~ ., ncol= 2) +
  ggplot2::scale_fill_manual(
    values=c('#01665e', '#5ab4ac', '#c7eae5','#f6e8c3', '#d8b365', '#8c510a'),
    guide = ggplot2::guide_legend(
      reverse = TRUE,
      nrow = 1
    )
  ) +
  ggplot2::scale_y_continuous(
    labels = scales::percent,
    expand = c(0,0)
  ) +
  ggplot2::theme_minimal()+
  ggplot2::theme(
    legend.position='bottom',
    legend.direction = "horizontal") +
  ggplot2::labs(
    x = '',
    y = 'Anteil in %',
    title = 'Abbildung F1.1',
    subtitle = 'Kompetenzstufenverteilung in der Jahrgangsstufe 9 im Fach Deutsch im IQB-Bildungstrend 2022',
    caption = 'Anmerkung: Werte kleiner 5 % werden in der Grafik nicht ausgewiesen.\nQuelle: IQB-Bildungstrend 2022 in der Sekundarstufe I'
  )









