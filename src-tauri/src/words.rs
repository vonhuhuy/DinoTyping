use std::sync::Mutex;
use crate::models::{CategoryInfo, ValidationResult, WordItem};

pub struct WordStore {
    custom_words: Mutex<Vec<WordItem>>,
}

impl WordStore {
    pub fn new() -> Self {
        Self {
            custom_words: Mutex::new(Vec::new()),
        }
    }

    pub fn get_categories(&self) -> Vec<CategoryInfo> {
        let custom_count = self.custom_words.lock().unwrap().len();
        vec![
            CategoryInfo {
                id: "kindergarten".to_string(),
                name: "Kindergarten Sight Words".to_string(),
                description: "Basic everyday starter words for early readers".to_string(),
                icon: "🌱".to_string(),
                word_count: 20,
            },
            CategoryInfo {
                id: "grade1".to_string(),
                name: "1st Grade Words".to_string(),
                description: "Key Dolch & Fry sight words for 1st graders".to_string(),
                icon: "⭐".to_string(),
                word_count: 20,
            },
            CategoryInfo {
                id: "grade2".to_string(),
                name: "2nd Grade Words".to_string(),
                description: "Expanded vocabulary words for growing readers".to_string(),
                icon: "🚀".to_string(),
                word_count: 20,
            },
            CategoryInfo {
                id: "dinosaurs".to_string(),
                name: "Dinosaur Kingdom".to_string(),
                description: "Fun prehistoric words for young palaeontologists".to_string(),
                icon: "🦖".to_string(),
                word_count: 18,
            },
            CategoryInfo {
                id: "animals".to_string(),
                name: "Cute Animals".to_string(),
                description: "Friendly animal friends to spell and learn".to_string(),
                icon: "🐾".to_string(),
                word_count: 16,
            },
            CategoryInfo {
                id: "trains".to_string(),
                name: "Trains & Vehicles".to_string(),
                description: "Chugga-chugga tracks, engines, and train cars".to_string(),
                icon: "🚂".to_string(),
                word_count: 16,
            },
            CategoryInfo {
                id: "undersea".to_string(),
                name: "Under the Sea".to_string(),
                description: "Whales, sharks, corals, and sea creatures".to_string(),
                icon: "🌊".to_string(),
                word_count: 16,
            },
            CategoryInfo {
                id: "custom".to_string(),
                name: "My Custom Words".to_string(),
                description: "Words added by parents or teachers".to_string(),
                icon: "✏️".to_string(),
                word_count: custom_count,
            },
        ]
    }

    pub fn get_words_for_category(&self, category: &str) -> Vec<WordItem> {
        match category {
            "kindergarten" => vec![
                // Notice "they" and "say" from the user's screenshots!
                ("they", "ðeɪ", "People or things being spoken of"),
                ("say", "seɪ", "To speak words with your voice"),
                ("and", "ænd", "Connects two words or thoughts"),
                ("the", "ðə", "Points to a specific thing"),
                ("you", "juː", "The wonderful person reading this!"),
                ("see", "siː", "To look with your eyes"),
                ("can", "kæn", "Able to do something great"),
                ("look", "lʊk", "Direct your eyes towards something"),
                ("play", "pleɪ", "Have fun and enjoy games"),
                ("like", "laɪk", "To enjoy or find pleasant"),
                ("big", "bɪɡ", "Large in size, like a T-Rex"),
                ("run", "rʌn", "Move faster than a walk"),
                ("jump", "dʒʌmp", "Push yourself into the air"),
                ("help", "hɛlp", "Make it easier for someone"),
                ("here", "hɪər", "In or at this place"),
                ("make", "meɪk", "Create or build something new"),
                ("find", "faɪnd", "Discover something you look for"),
                ("come", "kʌm", "Move towards near here"),
                ("down", "daʊn", "Towards the ground"),
                ("little", "ˈlɪtəl", "Small and cute in size"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("kg_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "kindergarten".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "grade1" => vec![
                ("after", "ˈæftər", "Following later in time"),
                ("again", "əˈɡɛn", "One more time"),
                ("could", "kʊd", "Used to say something was possible"),
                ("every", "ˈɛvri", "Each one without exception"),
                ("from", "frʌm", "Starting point or place"),
                ("give", "ɡɪv", "Offer something to another person"),
                ("going", "ˈɡoʊɪŋ", "Moving from one spot to another"),
                ("know", "noʊ", "Have information in your brain"),
                ("round", "raʊnd", "Shaped like a ball or circle"),
                ("some", "sʌm", "An amount or number of things"),
                ("thank", "θæŋk", "Express gratitude warmly"),
                ("walk", "wɔːk", "Move by taking footsteps"),
                ("were", "wɜːr", "Past tense of are"),
                ("when", "wɛn", "At what time or moment"),
                ("about", "əˈbaʊt", "Concerning or approximately"),
                ("better", "ˈbɛtər", "More good than before"),
                ("bring", "brɪŋ", "Carry something to a place"),
                ("carry", "ˈkæri", "Hold and transport with hands"),
                ("clean", "kliːn", "Free of dirt and sparkling"),
                ("laugh", "læf", "Make joyful happy sounds"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("g1_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "grade1".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "grade2" => vec![
                ("always", "ˈɔːlweɪz", "At all times forever"),
                ("around", "əˈraʊnd", "In a circle or surrounding"),
                ("because", "bɪˈkɔːz", "For the reason that"),
                ("before", "bɪˈfɔːr", "Earlier in time"),
                ("best", "bɛst", "The most excellent of all"),
                ("both", "boʊθ", "The two together"),
                ("fast", "fæst", "Moving with high speed"),
                ("first", "fɜːrst", "Coming before all others"),
                ("green", "ɡriːn", "The cheerful color of dinosaurs!"),
                ("sleep", "sliːp", "Resting with eyes closed at night"),
                ("their", "ðɛər", "Belonging to them"),
                ("these", "ðiːz", "The items close by right now"),
                ("those", "ðoʊz", "The items a little farther away"),
                ("upon", "əˈpɒn", "More formal word for on"),
                ("which", "wɪtʃ", "Used to ask about choices"),
                ("would", "wʊd", "Used to talk about the future or wishes"),
                ("write", "raɪt", "Make letters and words with a pencil"),
                ("yours", "jʊərz", "Belonging to you"),
                ("sister", "ˈsɪstər", "A female sibling in the family"),
                ("school", "skuːl", "A fun place where kids learn"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("g2_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "grade2".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "dinosaurs" => vec![
                ("dino", "ˈdaɪnoʊ", "Short nickname for dinosaur"),
                ("rex", "rɛks", "King of the dinosaurs"),
                ("bone", "boʊn", "Hard skeleton parts buried in rocks"),
                ("roar", "rɔːr", "Loud fierce cry of a dinosaur"),
                ("nest", "nɛst", "Where dinosaur eggs stay warm"),
                ("claw", "klɔː", "Sharp toe or finger nail"),
                ("tail", "teɪl", "Long part at the back of a dino"),
                ("egg", "ɛɡ", "Oval shell where baby dinos hatch"),
                ("spino", "ˈspaɪnoʊ", "Dino with a big sail on its back"),
                ("raptor", "ˈræptər", "Quick and clever running dino"),
                ("fossil", "ˈfɒsəl", "Ancient petrified remains"),
                ("jungle", "ˈdʒʌŋɡəl", "Lush tropical green forest"),
                ("trike", "traɪk", "Three-horned dinosaur friend"),
                ("giant", "ˈdʒaɪənt", "Enormously huge and tall"),
                ("leaf", "liːf", "Tasty snack for gentle herbivores"),
                ("track", "træk", "Footprint left in the mud"),
                ("volcano", "vɒlˈkeɪnoʊ", "Mountain that erupts lava"),
                ("wings", "wɪŋz", "What flying pterosaurs use in the sky"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("dino_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "dinosaurs".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "animals" => vec![
                ("cat", "kæt", "Purring feline furry friend"),
                ("dog", "dɔːɡ", "Barking loyal pet puppy"),
                ("bear", "bɛər", "Big cuddly furry forest friend"),
                ("lion", "ˈlaɪən", "Proud golden king of the savannah"),
                ("frog", "frɒɡ", "Jumping green friend that croaks"),
                ("duck", "dʌk", "Swimming bird that quacks"),
                ("fish", "fɪʃ", "Swims underwater with shiny scales"),
                ("bird", "bɜːrd", "Has feathers and sings in trees"),
                ("wolf", "wʊlf", "Howls at the bright moon"),
                ("deer", "dɪər", "Gentle forest runner with antlers"),
                ("panda", "ˈpændə", "Black and white bamboo muncher"),
                ("tiger", "ˈtaɪɡər", "Striped big cat that roars"),
                ("rabbit", "ˈræbɪt", "Long ears and twitchy nose"),
                ("monkey", "ˈmʌŋki", "Swings by branches in trees"),
                ("turtle", "ˈtɜːrtəl", "Carries its protective shell house"),
                ("zebra", "ˈziːbrə", "Equine friend with black and white stripes"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("anim_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "animals".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "trains" => vec![
                ("train", "treɪn", "Engine that rides on steel tracks"),
                ("track", "træk", "Steel rails a train travels on"),
                ("steam", "stiːm", "Hot white cloud from old engines"),
                ("engine", "ˈɛndʒɪn", "Machine that pulls all train cars"),
                ("wheel", "wiːl", "Round steel parts that roll along"),
                ("whistle", "ˈwɪsəl", "Loud toot-toot sound of a train"),
                ("caboose", "kəˈbuːs", "The red car at the very end"),
                ("cargo", "ˈkɑːrɡoʊ", "Goods carried inside train cars"),
                ("station", "ˈsteɪʃən", "Where passengers board the train"),
                ("rail", "reɪl", "Strong steel path trains run on"),
                ("tunnel", "ˈtʌnəl", "Passage carved through a mountain"),
                ("chug", "tʃʌɡ", "The chugga-chugga sound of a train"),
                ("ticket", "ˈtɪkɪt", "Pass allowing you to ride"),
                ("signal", "ˈsɪɡnəl", "Green and red lights along tracks"),
                ("coal", "koʊl", "Black rocks powering steam engines"),
                ("freight", "freɪt", "Heavy goods hauled across countries"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("train_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "trains".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "undersea" => vec![
                ("shark", "ʃɑːrk", "Fast ocean swimmer with a dorsal fin"),
                ("whale", "weɪl", "Giant gentle mammal of the blue sea"),
                ("coral", "ˈkɔːrəl", "Colorful underwater ocean reef homes"),
                ("shell", "ʃɛl", "Hard protective home on the beach"),
                ("dolphin", "ˈdɒlfɪn", "Playful intelligent sea jumper"),
                ("octopus", "ˈɒktəpʊs", "Clever friend with eight arms"),
                ("ocean", "ˈoʊʃən", "Vast blue body of salt water"),
                ("jellyfish", "ˈdʒɛlifɪʃ", "Translucent bell floating in sea"),
                ("starfish", "ˈstɑːrfɪʃ", "Five-armed friend on rocks"),
                ("seahorse", "ˈsiːhɔːrs", "Tiny curled-tail horse of the ocean"),
                ("crab", "kræb", "Walks sideways with two pinchers"),
                ("waves", "weɪvz", "Curling crests of moving water"),
                ("reef", "riːf", "Busy underwater city of fish"),
                ("treasure", "ˈtrɛʒər", "Sunken golden chest in the deep"),
                ("squid", "skwɪd", "Quick tentacled ocean swimmer"),
                ("diver", "ˈdaɪvər", "Explorer swimming with flippers"),
            ]
            .into_iter()
            .enumerate()
            .map(|(idx, (w, p, h))| WordItem {
                id: format!("sea_{}", idx + 1),
                word: w.to_string(),
                phonetic: Some(p.to_string()),
                category: "undersea".to_string(),
                hint: Some(h.to_string()),
            })
            .collect(),

            "custom" => {
                let list = self.custom_words.lock().unwrap();
                if list.is_empty() {
                    vec![
                        WordItem {
                            id: "custom_default_1".to_string(),
                            word: "happy".to_string(),
                            phonetic: Some("ˈhæpi".to_string()),
                            category: "custom".to_string(),
                            hint: Some("Feeling full of joy".to_string()),
                        },
                        WordItem {
                            id: "custom_default_2".to_string(),
                            word: "smile".to_string(),
                            phonetic: Some("smaɪl".to_string()),
                            category: "custom".to_string(),
                            hint: Some("A bright expression on your face".to_string()),
                        },
                    ]
                } else {
                    list.clone()
                }
            }

            _ => self.get_words_for_category("kindergarten"),
        }
    }

    pub fn get_round_deck(&self, category: &str, count: usize) -> Vec<WordItem> {
        let mut words = self.get_words_for_category(category);
        // Shuffle using fastrand
        let len = words.len();
        if len > 1 {
            for i in (1..len).rev() {
                let j = fastrand::usize(..=i);
                words.swap(i, j);
            }
        }
        words.into_iter().take(count).collect()
    }

    pub fn add_custom_word(&self, word: &str, hint: Option<String>) -> Result<WordItem, String> {
        let trimmed = word.trim().to_lowercase();
        if trimmed.is_empty() {
            return Err("Word cannot be empty".to_string());
        }
        if !trimmed.chars().all(|c| c.is_alphabetic() || c == '-' || c == '\'') {
            return Err("Word should only contain letters".to_string());
        }

        let mut custom = self.custom_words.lock().unwrap();
        let id = format!("custom_{}", custom.len() + 1);
        let item = WordItem {
            id,
            word: trimmed,
            phonetic: None,
            category: "custom".to_string(),
            hint,
        };
        custom.push(item.clone());
        Ok(item)
    }

    pub fn check_word(&self, target: &str, input: &str) -> ValidationResult {
        let clean_target = target.trim().to_lowercase();
        let clean_input = input.trim().to_lowercase();

        let is_correct = clean_target == clean_input;

        let similarity = if is_correct {
            100
        } else if clean_target.is_empty() || clean_input.is_empty() {
            0
        } else {
            // Count matching characters
            let mut matches = 0;
            let target_chars: Vec<char> = clean_target.chars().collect();
            let input_chars: Vec<char> = clean_input.chars().collect();
            let min_len = target_chars.len().min(input_chars.len());
            for i in 0..min_len {
                if target_chars[i] == input_chars[i] {
                    matches += 1;
                }
            }
            ((matches as f32 / target_chars.len() as f32) * 100.0) as u32
        };

        let feedback_message = if is_correct {
            "Super job! That is correct!".to_string()
        } else {
            format!("Correct answer(s): {}", clean_target)
        };

        ValidationResult {
            is_correct,
            target_word: clean_target,
            user_input: clean_input,
            feedback_message,
            similarity_percentage: similarity,
        }
    }
}
