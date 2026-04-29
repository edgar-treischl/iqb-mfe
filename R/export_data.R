# Export IQB data to JSON format for the React app

library(jsonlite)

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

# Convert to JSON and save
json_data <- toJSON(iqb_data, pretty = TRUE, auto_unbox = TRUE)
write(json_data, "src/data/iqb.json")

cat("Data exported to src/data/iqb.json\n")
