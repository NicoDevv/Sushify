-- Aggiungiamo una colonna 'rimuovibile' alla tabella piatto_componenti
ALTER TABLE `piatto_componenti` 
ADD COLUMN `rimuovibile` BOOLEAN NOT NULL DEFAULT FALSE;

-- Aggiorniamo i componenti che possono essere rimossi (esempio generale)
-- Imposta tutti i componenti come rimuovibili
UPDATE `piatto_componenti` SET `rimuovibile` = TRUE;

-- Alcuni esempi di componenti da impostare come NON rimuovibili (ingredienti fondamentali)
-- Il riso nei nigiri non può essere rimosso
UPDATE `piatto_componenti` 
SET `rimuovibile` = FALSE 
WHERE `id_c` = 300 -- Riso
AND `cod_p` IN (
    SELECT `id_piatto` FROM `piatto` WHERE `categoria` = 'Nigiri'
);

-- L'alga nori nei maki non può essere rimossa
UPDATE `piatto_componenti` 
SET `rimuovibile` = FALSE 
WHERE `id_c` = 307 -- Alga nori
AND `cod_p` IN (
    SELECT `id_piatto` FROM `piatto` WHERE `categoria` = 'Maki' OR `categoria` = 'Futomaki'
);

-- Popoliamo la tabella personalizzazioni con il tipo 'rimuovi'
INSERT INTO `personalizzazioni` (`id_personalizzazione`, `tipo_personalizzazione`, `descrizione`, `cod_comp`) 
VALUES 
(1, 'rimuovi', 'Rimuovi componente', NULL);

-- Creiamo una tabella per memorizzare le rimozioni effettive negli ordini
CREATE TABLE IF NOT EXISTS `componenti_rimossi` (
  `id_rimozione` int(11) NOT NULL AUTO_INCREMENT,
  `cod_ordine` int(11) NOT NULL,
  `cod_piatto` int(11) NOT NULL,
  `cod_componente` int(11) NOT NULL,
  PRIMARY KEY (`id_rimozione`),
  KEY `fk_ordine_rimoz` (`cod_ordine`),
  KEY `fk_piatto_rimoz` (`cod_piatto`),
  KEY `fk_comp_rimoz` (`cod_componente`),
  CONSTRAINT `fk_ordine_rimoz` FOREIGN KEY (`cod_ordine`) REFERENCES `ordine` (`id_ordine`) ON DELETE CASCADE,
  CONSTRAINT `fk_piatto_rimoz` FOREIGN KEY (`cod_piatto`) REFERENCES `piatto` (`id_piatto`),
  CONSTRAINT `fk_comp_rimoz` FOREIGN KEY (`cod_componente`) REFERENCES `componenti` (`id_componente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;