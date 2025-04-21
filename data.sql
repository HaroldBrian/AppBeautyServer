-- Active: 1744383203482@@127.0.0.1@3306@beautify
-- Active: 1744383203482@@127.0.0.1@3306@beautify
INSERT INTO Country (label, code, description) VALUES
('Cameroun', 'CM', 'Pays d’Afrique centrale'),
('France', 'FR', 'Pays d’Europe de l’Ouest');

INSERT INTO Town (label, countryId) VALUES
('Yaoundé', 1),
('Douala', 1),
('Paris', 2);

INSERT INTO User (email, name, surname, password, telephone, address, role, status)
VALUES 
('admin@tn.com', 'Admin', 'Root', 'hashed_password', '+237650000001', 'Centre, Yaoundé', 'ADMIN', true),
('brian@tn.com', 'Brian', 'B.', 'hashed_password', '+237650000002', 'Bastos, Yaoundé', 'PROVIDER', true),
('harold@tn.com', 'Harold', 'Nkodo', 'hashed_password', '+237650000003', 'Mokolo, Yaoundé', 'CLIENT', true);

INSERT INTO Shop (userId, code, name, description, location, phoneNumber, status)
VALUES 
(2, 'SH001', 'Beauty Pro Yaoundé', 'Salon haut de gamme spécialisé en soins capillaires', 'Yaoundé', '+237658989898', 'active');

INSERT INTO ServiceCategory (id, label, description, image, createdAt, updatedAt) VALUES
(1, 'Coiffure', 'Services de coiffure pour tous types de cheveux.', 'coiffure.png', '2024-11-02 12:07:07.404', '2024-11-02 12:07:07.404'),
(2, 'Onglerie', 'Soins, pose de vernis, faux ongles et nail art.', 'manicure.png', '2024-11-04 07:54:59.303', '2024-11-04 07:54:59.303'),
(3, 'Maquillage', 'Maquillage pour toutes occasions, jour, nuit, mariage.', 'makeUp.png', '2024-11-04 07:55:36.053', '2024-11-04 07:55:36.053'),
(4, 'Manicure-pédicure', 'Soins des mains et des pieds, gommage, hydratation, vernis.', 'pedicure.png', '2024-11-04 07:56:12.446', '2024-11-04 07:56:12.446'),
(5, 'Soins de beauté', 'Soins du visage, gommages, masques, anti-âge.', 'soinFace.png', '2024-11-04 07:56:46.891', '2024-11-04 07:56:46.891'),
(6, 'Massage', 'Massages relaxants, thérapeutiques, sportifs.', 'massage.png', '2024-11-04 07:57:12.116', '2024-11-04 07:57:12.116'),
(9, 'Coiffure Homme', 'Services de coupe et coiffure pour hommes, coupe classique, moderne, etc.', 'coiffureHomme.png', '2025-02-21 16:28:39.445', '2025-02-21 16:28:39.445'),
(10, 'Coiffure Femme', 'Services de coupe, coiffure, tissage, perruques et extensions pour femmes.', 'coiffureFemme.png', '2025-02-21 16:28:39.445', '2025-02-21 16:28:39.445'),
(11, 'Brushing', 'Brushing pour un look soigné et élégant, adapté à tout type de cheveux.', 'brushing.png', '2025-02-21 16:28:39.445', '2025-02-21 16:28:39.445'),
(12, 'Coloration Capillaire', 'Coloration des cheveux, mèches, balayage, colorations permanentes ou semi-permanentes.', 'coloration.png', '2025-02-21 16:28:39.445', '2025-02-21 16:28:39.445'),
(13, 'Lissage', 'Traitements lissants pour des cheveux lisses et soyeux, y compris le lissage brésilien.', 'lissage.png', '2025-02-21 16:28:39.445', '2025-02-21 16:28:39.445');


INSERT INTO Service (serviceCategoryId, shopId, label, description, time, amount, isVisible)
VALUES 
(1, 1, 'Tissage simple', 'Pose de tissage sans rajout', 60, 10000, 'true'),
(1, 1, 'Tresse africaine', 'Tressage traditionnel sans rajout', 90, 8000, 'true'),
(1, 1, 'Défrisage', 'Application de produit défrisant', 75, 9000, 'true'),
(1, 1, 'Shampoing + brushing', 'Lavage et brushing pour cheveux naturels', 45, 6000, 'true'),

(2, 1, 'Pose de faux ongles', 'Application de faux ongles avec gel UV', 90, 12000, 'true'),
(2, 1, 'Nail art', 'Décoration personnalisée des ongles', 60, 7000, 'true'),
(2, 1, 'Remplissage ongles', 'Remplissage gel ou résine', 60, 9000, 'true'),
(2, 1, 'Dépose complète', 'Retrait des faux ongles avec soin', 30, 4000, 'true'),

(3, 1, 'Maquillage jour', 'Maquillage léger et naturel pour la journée', 30, 5000, 'true'),
(3, 1, 'Maquillage soirée', 'Maquillage intense pour les événements', 45, 8000, 'true'),
(3, 1, 'Maquillage mariée', 'Prestation maquillage complète pour mariage', 90, 15000, 'true'),

(4, 1, 'Manicure complète', 'Soins des mains + vernis classique', 45, 5000, 'true'),
(4, 1, 'Pédicure spa', 'Soin complet des pieds avec gommage et hydratation', 60, 6000, 'true'),

(5, 1, 'Soin visage éclat', 'Nettoyage de peau + masque hydratant', 45, 7000, 'true'),
(5, 1, 'Soin anti-âge', 'Soin raffermissant avec massage du visage', 60, 10000, 'true'),
(5, 1, 'Gommage visage', 'Exfoliation douce du visage', 30, 5000, 'true'),

(6, 1, 'Massage relaxant', 'Massage du corps aux huiles essentielles', 60, 12000, 'true'),
(6, 1, 'Massage dos', 'Massage ciblé sur les tensions dorsales', 30, 7000, 'true'),
(6, 1, 'Massage aux pierres chaudes', 'Détente profonde avec pierres chauffées', 75, 15000, 'true');


INSERT INTO ProductCategory VALUES (1,'Produits Capillaires','path/to/image1.jpg','Shampooing, après-shampooing, traitements capillaires, huiles et sérums pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(2,'Maquillage','path/to/image2.jpg','Fond de teint, rouges à lèvres, mascara, ombres à paupières, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(3,'Soins du Visage','path/to/image3.jpg','Crèmes hydratantes, sérums, gommages, masques pour le visage.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(4,'Soins du Corps','path/to/image4.jpg','Crèmes corporelles, huiles, lotions pour le corps, produits anti-cellulite.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(5,'Vente de Perruques','path/to/image5.jpg','Perruques, extensions et accessoires pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(6,'Soins des Ongles','path/to/image6.jpg','Vernis, huiles pour cuticules, limes à ongles, produits pour manucure et pédicure.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(7,'Épilation','path/to/image7.jpg','Cires, crèmes d\'épilation, appareils d\'épilation.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(8,'Produits Anti-âge','path/to/image8.jpg','Crèmes anti-rides, sérums pour une peau jeune et radieuse.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(9,'Accessoires de Beauté','path/to/image9.jpg','Brosses, peignes, outils de maquillage, miroirs, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(10,'Parfums','path/to/image10.jpg','Parfums pour hommes et femmes, eaux de toilette et eaux de parfum.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148');

INSERT INTO Product (shopId, productCategoryId, name, quantity, price, description, status, images)
VALUES 
(1, 1, 'Après-shampoing réparateur', 40, 3000, 'Hydrate et démêle les cheveux abîmés', 'available', '["conditioner.jpg"]'),
(1, 1, 'Huile de ricin', 25, 4500, 'Stimule la pousse des cheveux', 'available', '["castor_oil.jpg"]'),
(1, 2, 'Mascara volume', 35, 6000, 'Pour des cils épais et recourbés', 'available', '["mascara.jpg"]'),
(1, 2, 'Palette ombres à paupières', 20, 10000, 'Palette de 12 couleurs nude et glamour', 'available', '["eyeshadow_palette.jpg"]'),
(1, 3, 'Crème hydratante jour', 40, 5500, 'Hydratation légère pour usage quotidien', 'available', '["day_cream.jpg"]'),
(1, 3, 'Masque purifiant', 30, 7000, 'Masque à l’argile pour peaux mixtes à grasses', 'available', '["clay_mask.jpg"]'),
(1, 4, 'Lotion hydratante corps', 50, 5000, 'Lait corporel nourrissant à l’aloe vera', 'available', '["body_lotion.jpg"]'),
(1, 4, 'Huile amincissante', 15, 9500, 'Aide à réduire la cellulite avec massages réguliers', 'available', '["slimming_oil.jpg"]'),
(1, 5, 'Perruque naturelle mi-longue', 10, 30000, 'Cheveux humains 100% vierges', 'available', '["wig1.jpg"]'),
(1, 5, 'Extension à clips', 25, 12000, 'Extensions faciles à poser en quelques minutes', 'available', '["hair_extensions.jpg"]'),
(1, 6, 'Vernis semi-permanent', 60, 3500, 'Tenue jusqu’à 3 semaines', 'available', '["gel_polish.jpg"]'),
(1, 6, 'Kit manucure pro', 15, 12000, 'Limes, poussoirs, pince à cuticules, etc.', 'available', '["nail_kit.jpg"]'),
(1, 7, 'Cire chaude naturelle', 20, 6000, 'Cire à base de sucre et citron', 'available', '["wax.jpg"]'),
(1, 7, 'Crème dépilatoire peaux sensibles', 35, 4500, 'Élimine les poils en douceur', 'available', '["depilatory_cream.jpg"]'),
(1, 8, 'Sérum anti-rides', 18, 15000, 'Sérum concentré à l’acide hyaluronique', 'available', '["anti_age_serum.jpg"]'),
(1, 8, 'Crème de nuit régénérante', 22, 11000, 'Agit pendant le sommeil', 'available', '["night_cream.jpg"]'),
(1, 9, 'Pinceaux de maquillage – Set de 12', 10, 9000, 'En poils synthétiques doux', 'available', '["brush_set.jpg"]'),
(1, 9, 'Miroir lumineux LED', 8, 15000, 'Miroir grossissant avec lumière intégrée', 'available', '["led_mirror.jpg"]'),
(1, 10, 'Eau de parfum femme – Florale', 12, 18000, 'Fragrance légère et fleurie', 'available', '["perfume_women.jpg"]'),
(1, 10, 'Parfum homme – Boisé', 14, 19000, 'Note boisée et élégante', 'available', '["perfume_men.jpg"]');

INSERT INTO Schedule (event, start_date, end_date)
VALUES 
('Formation sur les techniques de massage', '2025-05-10 09:00:00', '2025-05-10 17:00:00');

INSERT INTO Meet (userId, serviceId, date, hour, place, status)
VALUES 
(3, 1, '2025-04-25', '14:00', 'Salon Beauty Pro Yaoundé', 'pending');

INSERT INTO Rating (userId, meetId, notation, comment)
VALUES 
(3, 1, 5, 'Très satisfaite du service, la coiffeuse était top !');

INSERT INTO `Order` (id, userId, productId, quantity, totalAmount, status)
VALUES 
(UUID(), 3, 1, 2, 7000, 'paid');

INSERT INTO SubscriptionPlan (label, price, duration, description)
VALUES 
('Plan Basique', 100, 30, 'Accès aux fonctionnalités de base'),
('Plan Standard', 2500, 30, 'Accès aux fonctionnalités de base et à l\'espace boutique'),
('Plan Premium', 5000, 90, 'Accès illimité à toutes les fonctionnalités');

INSERT INTO Subscription (userId, subscriptionPlanId, status, endDate)
VALUES 
(2, 2, 'active', '2025-07-20');

INSERT INTO Payment (subscriptionId, amount, paymentDate, status)
VALUES 
(1, 5000, '2025-04-18', 'completed');
