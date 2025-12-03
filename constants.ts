import { CourseModule, Level } from './types';

// Enriched database with Free A1 and Premium A2 content

export const COURSE_CONTENT: CourseModule[] = [
  {
    level: Level.A1,
    title: "Débutant (Beginner)",
    description: "Start your journey with essential greetings, introductions, and survival phrases.",
    lessons: [
      {
        id: 'l-a1-1',
        level: Level.A1,
        title: "Salutations & Quotidien",
        description: "Greetings, introductions, and essential daily routine vocabulary.",
        icon: "👋",
        isPremium: false,
        vocabulary: [
          // Greetings
          { id: 'v1', french: "Bonjour", ipa: "/bɔ̃.ʒuʁ/", english: "Hello / Good morning", gender: 'm' },
          { id: 'v2', french: "Au revoir", ipa: "/o ʁə.vwaʁ/", english: "Goodbye", gender: 'm' },
          { id: 'v3', french: "S'il vous plaît", ipa: "/sil vu plɛ/", english: "Please (formal)", context: "Used with strangers or elders." },
          { id: 'v4', french: "Merci", ipa: "/mɛʁ.si/", english: "Thank you" },
          { id: 'v_intro', french: "Enchanté(e)", ipa: "/ɑ̃.ʃɑ̃.te/", english: "Nice to meet you", gender: 'm' },
          { id: 'v_night', french: "Bonne nuit", ipa: "/bɔn nɥi/", english: "Good night", gender: 'f' },
          { id: 'v_soon', french: "À bientôt", ipa: "/a bjɛ̃.to/", english: "See you soon" },
          // Daily Life Additions
          { id: 'v5', french: "Le matin", ipa: "/lə ma.tɛ̃/", english: "The morning", gender: 'm' },
          { id: 'v6', french: "L'après-midi", ipa: "/la.pʁɛ.mi.di/", english: "The afternoon", gender: 'm' },
          { id: 'v7', french: "Le soir", ipa: "/lə swaʁ/", english: "The evening", gender: 'm' },
          { id: 'v8', french: "Travailler", ipa: "/tʁa.va.je/", english: "To work" },
          { id: 'v9', french: "Manger", ipa: "/mɑ̃.ʒe/", english: "To eat" },
          { id: 'v10', french: "Aujourd'hui", ipa: "/o.ʒuʁ.dɥi/", english: "Today" },
          { id: 'v11', french: "Demain", ipa: "/də.mɛ̃/", english: "Tomorrow" },
          { id: 'v12', french: "La semaine", ipa: "/la sə.mɛn/", english: "The week", gender: 'f' },
        ],
        phrases: [
          { id: 'p1', french: "Comment ça va ?", english: "How is it going?", formal: false },
          { id: 'p2', french: "Je vais bien, merci.", english: "I am doing well, thank you.", formal: true },
          { id: 'p3', french: "Quoi de neuf ?", english: "What's new?", formal: false },
          { id: 'p4', french: "Je suis fatigué(e).", english: "I am tired.", formal: false },
          { id: 'p5', french: "À tout à l'heure.", english: "See you later.", formal: false },
          { id: 'p6', french: "Bonne journée !", english: "Have a good day!", formal: true },
          { id: 'p7', french: "Tu fais quoi ?", english: "What are you doing?", formal: false },
          { id: 'p8', french: "Comment t'appelles-tu ?", english: "What is your name?", formal: false },
        ],
        scenario: {
          title: "Une rencontre au café",
          description: "Two people meeting for the first time at a casual coffee shop in Paris.",
          lines: [
            { speaker: "Marc", french: "Bonjour ! Est-ce que cette chaise est libre ?", english: "Hello! Is this chair free?", avatar: "👨🏻" },
            { speaker: "Sophie", french: "Bonjour. Oui, bien sûr. Allez-y.", english: "Hello. Yes, of course. Go ahead.", avatar: "👩🏽" },
            { speaker: "Marc", french: "Merci. Je m'appelle Marc. Et vous ?", english: "Thank you. My name is Marc. And you?", avatar: "👨🏻" },
            { speaker: "Sophie", french: "Moi, c'est Sophie. Enchantée.", english: "I'm Sophie. Nice to meet you.", avatar: "👩🏽" },
            { speaker: "Marc", french: "Enchanté Sophie. Vous habitez à Paris ?", english: "Nice to meet you Sophie. Do you live in Paris?", avatar: "👨🏻" },
            { speaker: "Sophie", french: "Non, je suis juste en vacances pour une semaine.", english: "No, I am just on vacation for a week.", avatar: "👩🏽" },
            { speaker: "Marc", french: "Ah, super ! Vous aimez la ville ?", english: "Ah, great! Do you like the city?", avatar: "👨🏻" },
            { speaker: "Sophie", french: "Oui, c'est magnifique, surtout la tour Eiffel !", english: "Yes, it is magnificent, especially the Eiffel Tower!", avatar: "👩🏽" },
          ]
        }
      },
      {
        id: 'l-a1-2',
        level: Level.A1,
        title: "Au Restaurant",
        description: "Ordering food, asking for the bill, and understanding the menu.",
        icon: "🥐",
        isPremium: false,
        vocabulary: [
          { id: 'v1', french: "L'addition", ipa: "/la.di.sjɔ̃/", english: "The bill", gender: 'f' },
          { id: 'v2', french: "Le menu", ipa: "/lə mə.ny/", english: "The menu", gender: 'm' },
          { id: 'v3', french: "L'eau", ipa: "/lo/", english: "Water", gender: 'f' },
          { id: 'v4', french: "Le vin", ipa: "/lə vɛ̃/", english: "Wine", gender: 'm' },
          { id: 'v5', french: "Délicieux", ipa: "/de.li.sjø/", english: "Delicious" },
          { id: 'v6', french: "Le pain", ipa: "/lə pɛ̃/", english: "Bread", gender: 'm' },
          { id: 'v7', french: "Le serveur", ipa: "/lə sɛʁ.vœʁ/", english: "The waiter", gender: 'm' },
          { id: 'v8', french: "Commander", ipa: "/kɔ.mɑ̃.de/", english: "To order" },
        ],
        phrases: [
          { id: 'p1', french: "Je voudrais le menu, s'il vous plaît.", english: "I would like the menu, please.", formal: true },
          { id: 'p2', french: "C'est délicieux !", english: "It's delicious!", formal: false },
          { id: 'p3', french: "L'addition, s'il vous plaît.", english: "The check, please.", formal: true },
          { id: 'p4', french: "Je suis végétarien.", english: "I am vegetarian.", formal: true },
          { id: 'p5', french: "Une table pour deux personnes.", english: "A table for two people.", formal: true },
        ],
        scenario: {
          title: "Commander le déjeuner",
          description: "Ordering a simple lunch at a bistro.",
          lines: [
            { speaker: "Serveur", french: "Bonjour monsieur, vous avez choisi ?", english: "Hello sir, have you decided?", avatar: "🤵" },
            { speaker: "Client", french: "Oui, je vais prendre le poulet rôti avec des frites.", english: "Yes, I will have the roast chicken with fries.", avatar: "👱" },
            { speaker: "Serveur", french: "Très bien. Et quelle cuisson pour le poulet ?", english: "Very well. And how would you like the chicken cooked?", avatar: "🤵" },
            { speaker: "Client", french: "Bien cuit, s'il vous plaît.", english: "Well done, please.", avatar: "👱" },
            { speaker: "Serveur", french: "Et comme boisson ?", english: "And for a drink?", avatar: "🤵" },
            { speaker: "Client", french: "Une carafe d'eau et un verre de vin rouge.", english: "A jug of water and a glass of red wine.", avatar: "👱" },
            { speaker: "Serveur", french: "Parfait, ça arrive tout de suite.", english: "Perfect, coming right up.", avatar: "🤵" },
          ]
        }
      },
      {
        id: 'l-a1-3',
        level: Level.A1,
        title: "Ma Routine",
        description: "Describing your daily habits: waking up, transport, and meals.",
        icon: "⏰",
        isPremium: false,
        vocabulary: [
          { id: 'v1', french: "Se réveiller", ipa: "/sə ʁe.ve.je/", english: "To wake up" },
          { id: 'v2', french: "Se laver", ipa: "/sə la.ve/", english: "To wash oneself" },
          { id: 'v3', french: "Le petit-déjeuner", ipa: "/lə pə.ti de.ʒœ.ne/", english: "Breakfast", gender: 'm' },
          { id: 'v4', french: "Prendre le bus", ipa: "/pʁɑ̃dʁ lə bys/", english: "To take the bus" },
          { id: 'v5', french: "Rentrer", ipa: "/ʁɑ̃.tʁe/", english: "To go home/come back" },
          { id: 'v6', french: "Dormir", ipa: "/dɔʁ.miʁ/", english: "To sleep" },
        ],
        phrases: [
          { id: 'p1', french: "Je me réveille à sept heures.", english: "I wake up at seven.", formal: false },
          { id: 'p2', french: "Je prends un café.", english: "I am having a coffee.", formal: false },
          { id: 'p3', french: "Je pars au travail à huit heures.", english: "I leave for work at eight.", formal: false },
          { id: 'p4', french: "Je rentre chez moi le soir.", english: "I go home in the evening.", formal: false },
        ],
        scenario: {
          title: "Une matinée typique",
          description: "Talking about morning habits.",
          lines: [
            { speaker: "Ami", french: "Tu te lèves tôt le matin d'habitude ?", english: "Do you usually get up early in the morning?", avatar: "🧢" },
            { speaker: "Moi", french: "Oui, je me lève à six heures pour faire du sport.", english: "Yes, I get up at six to exercise.", avatar: "😐" },
            { speaker: "Ami", french: "C'est courageux ! Et après ?", english: "That's brave! And then?", avatar: "🧢" },
            { speaker: "Moi", french: "Je prends une douche et je mange un croissant.", english: "I take a shower and eat a croissant.", avatar: "😐" },
            { speaker: "Ami", french: "Tu as de la chance. Moi, je dors jusqu'à midi.", english: "You are lucky. I sleep until noon.", avatar: "🧢" },
          ]
        }
      }
    ]
  },
  {
    level: Level.A2,
    title: "Élémentaire (Elementary)",
    description: "Unlock full potential. Talk about travel, work, and past experiences.",
    lessons: [
      {
        id: 'l-a2-1',
        level: Level.A2,
        title: "Les Voyages",
        description: "Booking tickets, navigating airports, and asking for directions.",
        icon: "✈️",
        isPremium: true,
        vocabulary: [
          { id: 'v1', french: "Le billet", ipa: "/lə bi.jɛ/", english: "The ticket", gender: 'm' },
          { id: 'v2', french: "La gare", ipa: "/la ɡaʁ/", english: "The train station", gender: 'f' },
          { id: 'v3', french: "La valise", ipa: "/la va.liz/", english: "The suitcase", gender: 'f' },
          { id: 'v4', french: "L'avion", ipa: "/la.vjɔ̃/", english: "The plane", gender: 'm' },
          { id: 'v5', french: "Partir", ipa: "/paʁ.tiʁ/", english: "To leave" },
        ],
        phrases: [
          { id: 'p1', french: "À quelle heure part le train ?", english: "What time does the train leave?", formal: true },
          { id: 'p2', french: "Je cherche la gare.", english: "I am looking for the train station.", formal: true },
          { id: 'p3', french: "J'ai perdu ma valise.", english: "I lost my suitcase.", formal: true },
        ],
        scenario: {
          title: "À la gare",
          description: "Buying a ticket to Lyon.",
          lines: [
            { speaker: "Voyageur", french: "Bonjour, un billet pour Lyon, s'il vous plaît.", english: "Hello, one ticket to Lyon, please.", avatar: "🎒" },
            { speaker: "Guichetier", french: "Aller-simple ou aller-retour ?", english: "One-way or round-trip?", avatar: "👮" },
            { speaker: "Voyageur", french: "Aller-retour. Départ aujourd'hui.", english: "Round-trip. Departing today.", avatar: "🎒" },
            { speaker: "Guichetier", french: "Vous avez une carte de réduction ?", english: "Do you have a discount card?", avatar: "👮" },
            { speaker: "Voyageur", french: "Non, je n'en ai pas.", english: "No, I don't have one.", avatar: "🎒" },
            { speaker: "Guichetier", french: "D'accord. C'est 50 euros. Le train part du quai 4.", english: "Okay. That is 50 euros. The train leaves from platform 4.", avatar: "👮" },
          ]
        }
      },
      {
        id: 'l-a2-2',
        level: Level.A2,
        title: "Shopping & Mode",
        description: "Buying clothes, asking for sizes, and colors.",
        icon: "🛍️",
        isPremium: true,
        vocabulary: [
          { id: 'v1', french: "Le magasin", ipa: "/lə ma.ɡa.zɛ̃/", english: "The store", gender: 'm' },
          { id: 'v2', french: "Cher", ipa: "/ʃɛʁ/", english: "Expensive" },
          { id: 'v3', french: "La taille", ipa: "/la taj/", english: "The size", gender: 'f' },
          { id: 'v4', french: "Payer", ipa: "/pe.je/", english: "To pay" },
          { id: 'v5', french: "La carte", ipa: "/la kaʁt/", english: "The card", gender: 'f' },
          { id: 'v6', french: "Essayer", ipa: "/e.se.je/", english: "To try on" },
        ],
        phrases: [
          { id: 'p1', french: "Combien ça coûte ?", english: "How much does it cost?", formal: true },
          { id: 'p2', french: "Je peux essayer ?", english: "Can I try it on?", formal: true },
          { id: 'p3', french: "Avez-vous une autre taille ?", english: "Do you have another size?", formal: true },
        ],
        scenario: {
          title: "Dans une boutique",
          description: "Buying a sweater.",
          lines: [
            { speaker: "Vendeur", french: "Bonjour, je peux vous aider ?", english: "Can I help you?", avatar: "👔" },
            { speaker: "Client", french: "Oui, je cherche un pull rouge en coton.", english: "Yes, I am looking for a red cotton sweater.", avatar: "🧢" },
            { speaker: "Vendeur", french: "Regardez ici. Quelle est votre taille ?", english: "Look here. What is your size?", avatar: "👔" },
            { speaker: "Client", french: "Je fais du M d'habitude.", english: "I usually wear a medium.", avatar: "🧢" },
            { speaker: "Vendeur", french: "Tenez, essayez celui-ci. La cabine est au fond.", english: "Here, try this one. The fitting room is in the back.", avatar: "👔" },
          ]
        }
      },
      {
        id: 'l-a2-3',
        level: Level.A2,
        title: "Santé & Médecin",
        description: "Explaining symptoms, visiting the doctor, and pharmacy basics.",
        icon: "🩺",
        isPremium: true,
        vocabulary: [
          { id: 'v1', french: "Le médecin", ipa: "/lə med.sɛ̃/", english: "The doctor", gender: 'm' },
          { id: 'v2', french: "Malade", ipa: "/ma.lad/", english: "Sick" },
          { id: 'v3', french: "La fièvre", ipa: "/la fjɛvʁ/", english: "Fever", gender: 'f' },
          { id: 'v4', french: "Le médicament", ipa: "/me.di.ka.mɑ̃/", english: "Medicine", gender: 'm' },
          { id: 'v5', french: "La tête", ipa: "/la tɛt/", english: "Head", gender: 'f' },
        ],
        phrases: [
          { id: 'p1', french: "Je ne me sens pas bien.", english: "I don't feel well.", formal: false },
          { id: 'p2', french: "J'ai mal à la tête.", english: "I have a headache.", formal: false },
          { id: 'p3', french: "Il faut prendre ce médicament.", english: "You must take this medicine.", formal: true },
        ],
        scenario: {
          title: "Consultation médicale",
          description: "Describing symptoms to a doctor.",
          lines: [
            { speaker: "Médecin", french: "Bonjour. Qu'est-ce qui ne va pas aujourd'hui ?", english: "Hello. What is wrong today?", avatar: "👩‍⚕️" },
            { speaker: "Patient", french: "J'ai très mal au ventre et j'ai de la fièvre depuis hier.", english: "I have a bad stomach ache and I have a fever since yesterday.", avatar: "🤒" },
            { speaker: "Médecin", french: "Vous avez mangé quelque chose de bizarre ?", english: "Did you eat something strange?", avatar: "👩‍⚕️" },
            { speaker: "Patient", french: "Peut-être les fruits de mer au restaurant...", english: "Maybe the seafood at the restaurant...", avatar: "🤒" },
            { speaker: "Médecin", french: "Je vois. Prenez ce médicament trois fois par jour.", english: "I see. Take this medicine three times a day.", avatar: "👩‍⚕️" },
          ]
        }
      }
    ]
  }
];