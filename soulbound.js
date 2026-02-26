// ═══════════════════════════════════════════════════════════════════
//  CARD DATA — loaded from JSON files, with embedded fallback
//  To add new cards: edit the JSON files in /cards folder
//  The embedded fallback ensures the game works offline & via file://
// ═══════════════════════════════════════════════════════════════════

/** Mutable card arrays — populated by CardLoader.loadAll() */
let FACTIONS = [];
let IMMORTALS = [];
let FACTION_CARDS = [];
let NEUTRALS = [];
let RIFTS = [];
let ALL_CARDS = [];

// ═══════════════════════════════════════════════════════════════════
//  CARD LOADER — fetches JSON with embedded fallback
// ═══════════════════════════════════════════════════════════════════

class CardLoader {
    /** JSON file paths (relative to HTML) */
    static PATHS = {
        factions:  'cards/factions.json',
        immortals: 'cards/immortals.json',
        creatures: 'cards/creatures.json',
        rifts:     'cards/rifts.json',
    };

    /** Embedded fallback data (auto-generated from JSON files) */
    static FALLBACK = {
        factions:  [{"id":"pure","name":"Pure","color":"#4a9eff","glow":"rgba(74,158,255,.4)","icon":"💧","desc":"Balanced. Rich in Magic & Artefacts."},{"id":"tainted","name":"Tainted","color":"#d45b9e","glow":"rgba(212,91,158,.4)","icon":"☠️","desc":"Reanimation. Sacrifice combos. Debuffs."},{"id":"divine","name":"Divine","color":"#f0c040","glow":"rgba(240,192,64,.4)","icon":"✨","desc":"Healing. Powerful Magic Cards."},{"id":"infernal","name":"Infernal","color":"#e03030","glow":"rgba(224,48,48,.4)","icon":"🔥","desc":"High damage. Aggressive. Low magic."},{"id":"beast","name":"Beast","color":"#4aaa55","glow":"rgba(74,170,85,.4)","icon":"🐉","desc":"Sacrifice. High cost — high power."},{"id":"cursed","name":"Cursed","color":"#9a4aee","glow":"rgba(154,74,238,.4)","icon":"🌀","desc":"Abilities. Timer card synergy."},{"id":"neutral","name":"Neutral","color":"#9a9a8a","glow":"rgba(154,154,138,.4)","icon":"⚪","desc":"Available to any deck. No specific faction soul cost."}],
        immortals: [{"id":"#0001","name":"Nero; The Old King","factions":["pure"],"souls":3,"abilityName":"Royal Command","desc":"All the cards on the opponents side of the field go into the attack stand for this turn.","color":"#5baeff","realArt":"art/#0001 Nero; The Old King.png"},{"id":"#0002","name":"Military Commander Otren","factions":["pure"],"souls":3,"abilityName":"Tactical Suppression","desc":"Give all the cards on your opponents side of the playingfield -1 attack for this turn.","color":"#5baeff","realArt":"art/#0002 Military Commander Otren.png"},{"id":"#0003","name":"Nymph of the Reef","factions":["pure"],"souls":4,"abilityName":"Soul Harvest","desc":"For every card (opponent included) that you destroy this turn, you get 1 soul of your choice back into the soul jar.","color":"#5baeff","realArt":"art/#0003 Nymph of the reef.png"},{"id":"#0004","name":"Emma; The Angelic Cleric","factions":["divine"],"souls":4,"abilityName":"Divine Mend","desc":"All cards on your side of the field restore 2 Health, up to their maximum Health.","color":"#e8b830","realArt":"art/#0004 Emma; The Angelic Cleric.png"},{"id":"#0005","name":"Archangel Promethias","factions":["divine"],"souls":4,"abilityName":"Divine Shield","desc":"For 1 round, all cards on your side of the field cannot have their health reduced below 1.","color":"#e8b830","realArt":"art/#0005 Archangel Promethias.png"},{"id":"#0006","name":"Ksama The Godwoken","factions":["divine"],"souls":5,"abilityName":"Heavenly Smite","desc":"All cards on your side of the field gain Heavenly Smite this turn.","color":"#e8b830","realArt":"art/#0006 Ksama The Godwoken.png"},{"id":"#0007","name":"Naga the Cunning","factions":["beast"],"souls":5,"abilityName":"Predators Claim","desc":"Sacrifice 1 card on your opponents field. Gain its Soul Points.","color":"#3da84a","realArt":"art/#0007 Naga the Cunning.png"},{"id":"#0008","name":"Beast Rider Tlalli","factions":["beast"],"souls":3,"abilityName":"Sudden Assault","desc":"All creatures on your side of the field gain Sudden Assault until the start of your next turn.","color":"#3da84a","realArt":"art/#0008 Beast Rider Tlalli.png"},{"id":"#0009","name":"Kalu Healer of the Sea","factions":["beast"],"souls":3,"abilityName":"Sacrifice Blessing","desc":"All creatures on your side of the field that you sacrifice this turn have a +1 sacrifice bonus.","color":"#3da84a","realArt":"art/#0009 Kalu Healer of the Sea.png"},{"id":"#0010","name":"Dranic The Devourer","factions":["infernal"],"souls":4,"abilityName":"Devouring Strike","desc":"Give 1 card on your side of the field +3 attack for 1 round.","color":"#d63030","realArt":"art/#0010 Dranic The Devourer.png"},{"id":"#0011","name":"Wingless Demon Fleq","factions":["infernal"],"souls":4,"abilityName":"Demon Dash","desc":"Give all the cards on your side of the playingfield \"Dash\".","color":"#d63030","realArt":"art/#0011 Wingless Demon.png"},{"id":"#0012","name":"Beacore The Blue","factions":["infernal"],"souls":6,"abilityName":"Blue Surge","desc":"Give all cards on your side of the field +2 attack for this turn.","color":"#5baeff","realArt":"art/#0012 Beacore The Blue.png"},{"id":"#0013","name":"Isabella; Witch of the Void","factions":["tainted"],"souls":3,"abilityName":"Void Hand","desc":"Send a card from your opponents hand of your choosing to the void.","color":"#c94f8a","realArt":"art/#0013 Isabella; Witch of the Void.png"},{"id":"#0014","name":"The Foul One","factions":["tainted"],"souls":6,"abilityName":"Dark Ritual","desc":"Give all the cards on your side of the field \"Dark Ritual\".","color":"#c94f8a","realArt":"art/#0014 The Foul One.png"},{"id":"#0015","name":"Horned Mistress Diabel","factions":["tainted"],"souls":5,"abilityName":"Mistress Return","desc":"Choose 1 card from your opponents playingfield and return it to their hand.","color":"#c94f8a","realArt":"art/#0015 Horned Mistress Diabel.png"},{"id":"#0016","name":"Fredariq The Undead","factions":["cursed"],"souls":5,"abilityName":"Undead Menace","desc":"At the end of this round, return each creature you control that was destroyed to your hand.","color":"#8e3fe0","realArt":"art/#0016 Fredariq the Undead.png"},{"id":"#0017","name":"Vampire Lord Silar","factions":["cursed"],"souls":4,"abilityName":"Vampiric Grace","desc":"Give all cards on your side of the field \"Eternal Torment\".","color":"#8e3fe0","realArt":"art/#0017 Vampire Lord Silas.png"},{"id":"#0018","name":"Wandering Ghost of The Vale","factions":["cursed"],"souls":3,"abilityName":"Eternal Hand","desc":"Grab the top card from the void and put it back into your deck, then shuffle your deck and draw 1 card.","color":"#8e3fe0","realArt":"art/#0018 Wandering Ghost of the Vale.png"},{"id":"#0019","name":"Anariel; Messenger of The Old Ones","factions":["pure","divine"],"souls":5,"abilityName":"Secret Spell","desc":"Remove an effect/ability from a creature card on the playingfield","color":"#e8b830","realArt":"art/#0019 Anariel; Messenger of The Old Ones.png"},{"id":"#0020","name":"Lunaris The Silver Beast","factions":["pure","beast"],"souls":6,"abilityName":"Lunar Conversion","desc":"Cards from the \"Beast\" faction that you control on your side of the playingfield, become \"Pure\" faction cards and get a \"+1\" to their sacrifice stat for this turn.","color":"#3da84a","realArt":"art/#0020 Lunaris The Silver Beast.png"},{"id":"#0021","name":"Eldriana The Cleansing Flame","factions":["pure","infernal"],"souls":6,"abilityName":"Blue Flame","desc":"Whenever a \"Pure\" faction creature you control is destroyed this round, summon an \"infernal\" creature with cost 3 or less from your deck.","color":"#3da84a","realArt":"art/#0021 Eldriana; The Cleansing Flame.png"},{"id":"#0022","name":"Zirith Of The Mirror Ways","factions":["pure","tainted"],"souls":6,"abilityName":"Mirrored Conversion","desc":"Choose a player. Place all cards in your hand into the void, shuffle, then draw that many cards.","color":"#3da84a","realArt":"art/#0022 Zirith of The Mirror Ways.png"},{"id":"#0023","name":"Visera Stealer of Souls","factions":["pure","cursed"],"souls":5,"abilityName":"Soul Stealer","desc":"During your turn, steal 1 soul from your opponent\"s soul jar for each \"cursed\" or \"pure\" creature on the field.","color":"#3da84a","realArt":"art/#0023 Visara Stealer of Souls.png"},{"id":"#0028","name":"Brassen Bullseye","factions":["beast","infernal"],"souls":4,"abilityName":"Raging Bull","desc":"Choose a creature you control. It gains \"Burning Cloak\".","color":"#3da84a","realArt":"art/#0028 Brassen Bullseye.png"},{"id":"#0030","name":"Zelakoree","factions":["beast","cursed"],"souls":7,"abilityName":"Zee Zaa","desc":"Whenever a ‘Beast’ faction creature you control dies this round, return it to the field as a ‘Cursed’ creature with 1 Attack and 1 Health.","color":"#c94f8a","realArt":"art/#0030 Zelakoree.png"},{"id":"#0031","name":"Xorath The Corrupt Statue","factions":["tainted","infernal"],"souls":7,"abilityName":"Corrupt Dominion","desc":"All enemy creatures lose 2 attack this turn. For each enemy creature destroyed this way, gain 1 Tainted or Infernal soul.","color":"#c94f8a","realArt":"art/#0031 Xorath The Corrupt Statue.png"},{"id":"#0032","name":"Malceron The Burned","factions":["infernal","cursed"],"souls":6,"abilityName":"Corrupt Dominion","desc":"For 1 turn, whenever a creature you control dies, deal 2 damage to a creature your opponent controls.","color":"#d63030","realArt":"art/#0032 Malceron The Burned.png"},{"id":"#0033","name":"Morvath The Unholy Revenant","factions":["tainted","cursed"],"souls":5,"abilityName":"Unholy Seal","desc":"Your opponents Immortal card cannot be used this round and next round the cost is +1.","color":"#8e3fe0","realArt":"art/#0033 Morvath The Unholy Revenant.png"}],"souls":3,"abilityName":"Royal Command","desc":"All the cards on the opponents side of the field go into the attack stand for this turn.","color":"#5baeff","realArt":"art/0001NeroTheOldKing.png"},{"id":"#0002","name":"Military Commander Otren","factions":["pure"],"souls":3,"abilityName":"Tactical Suppression","desc":"Give all the cards on your opponents side of the playingfield -1 attack for this turn.","color":"#5baeff","realArt":"art/0002MilitaryCommanderOtren.png"},{"id":"#0003","name":"Nymph of the Reef","factions":["pure"],"souls":4,"abilityName":"Soul Harvest","desc":"For every card (opponent included) that you destroy this turn, you get 1 soul of your choice back into the soul jar.","color":"#5baeff","realArt":"art/0003Nymph of the reef.png"},{"id":"#0004","name":"Emma; The Angelic Cleric","factions":["divine"],"souls":4,"abilityName":"Divine Mend","desc":"All cards on your side of the field restore 2 Health, up to their maximum Health.","color":"#e8b830","realArt":"art/0004Emma; The Angelic Cleric.png"},{"id":"#0005","name":"Archangel Promethias","factions":["divine"],"souls":4,"abilityName":"Divine Shield","desc":"For 1 round, all cards on your side of the field cannot have their health reduced below 1.","color":"#e8b830","realArt":"art/0005Archangel Promotheus.png"},{"id":"#0006","name":"Ksama The Godwoken","factions":["divine"],"souls":5,"abilityName":"Heavenly Smite","desc":"All cards on your side of the field gain Heavenly Smite this turn.","color":"#e8b830","realArt":"art/0006KsamaTheGodWoken.png"},{"id":"#0007","name":"Naga the Cunning","factions":["beast"],"souls":5,"abilityName":"Predators Claim","desc":"Sacrifice 1 card on your opponents field. Gain its Soul Points.","color":"#3da84a","realArt":"art/0007Naga the Cunning.png"},{"id":"#0008","name":"Beast Rider Tlalli","factions":["beast"],"souls":3,"abilityName":"Sudden Assault","desc":"All creatures on your side of the field gain Sudden Assault until the start of your next turn.","color":"#3da84a","realArt":"art/0008BeastRiderTlalli.png"},{"id":"#0009","name":"Kalu Healer of the Sea","factions":["beast"],"souls":3,"abilityName":"Sacrifice Blessing","desc":"All creatures on your side of the field that you sacrifice this turn have a +1 sacrifice bonus.","color":"#3da84a","realArt":"art/0009KaluHealerOfTheSeapng.png"},{"id":"#0010","name":"Dranic The Devourer","factions":["infernal"],"souls":4,"abilityName":"Devouring Strike","desc":"Give 1 card on your side of the field +3 attack for 1 round.","color":"#d63030","realArt":"art/0010Dranic The Devourer.png"},{"id":"#0011","name":"Wingless Demon Fleq","factions":["infernal"],"souls":4,"abilityName":"Demon Dash","desc":"Give all the cards on your side of the playingfield \"Dash\".","color":"#d63030","realArt":"art/0011WinglessDemonFleq.png"},{"id":"#0012","name":"Beacore The Blue","factions":["infernal"],"souls":6,"abilityName":"Blue Surge","desc":"Give all cards on your side of the field +2 attack for this turn.","color":"#5baeff","realArt":"art/0012BeacoreTheBlue.png"},{"id":"#0013","name":"Isabella; Witch of the Void","factions":["tainted"],"souls":3,"abilityName":"Void Hand","desc":"Send a card from your opponents hand of your choosing to the void.","color":"#c94f8a","realArt":"art/0013Isabella; Witch of the void.png"},{"id":"#0014","name":"The Foul One","factions":["tainted"],"souls":6,"abilityName":"Dark Ritual","desc":"Give all the cards on your side of the field \"Dark Ritual\".","color":"#c94f8a","realArt":"art/0014TheFoulOne.png"},{"id":"#0015","name":"Horned Mistress Diabel","factions":["tainted"],"souls":5,"abilityName":"Mistress Return","desc":"Choose 1 card from your opponents playingfield and return it to their hand.","color":"#c94f8a","realArt":"art/0015HornedMistressDiabel.png"},{"id":"#0016","name":"Fredariq The Undead","factions":["cursed"],"souls":5,"abilityName":"Undead Menace","desc":"At the end of this round, return each creature you control that was destroyed to your hand.","color":"#8e3fe0","realArt":"art/0016FredariqTheUndead.png"},{"id":"#0017","name":"Vampire Lord Silar","factions":["cursed"],"souls":4,"abilityName":"Vampiric Grace","desc":"Give all cards on your side of the field \"Eternal Torment\".","color":"#8e3fe0","realArt":"art/0017VampireLordSilas.png"},{"id":"#0018","name":"Wandering Ghost of The Vale","factions":["cursed"],"souls":3,"abilityName":"Eternal Hand","desc":"Grab the top card from the void and put it back into your deck, then shuffle your deck and draw 1 card.","color":"#8e3fe0","realArt":"art/0018WanderingGhostOfTheVale.png"},{"id":"#0019","name":"Anariel; Messenger of The Old Ones","factions":["pure","divine"],"souls":5,"abilityName":"Secret Spell","desc":"Remove an effect/ability from a creature card on the playingfield","color":"#e8b830","realArt":"art/0019.AnarielMessengerOfTheOldOnes.png"},{"id":"#0020","name":"Lunaris The Silver Beast","factions":["pure","beast"],"souls":6,"abilityName":"Lunar Conversion","desc":"Cards from the \"Beast\" faction that you control on your side of the playingfield, become \"Pure\" faction cards and get a \"+1\" to their sacrifice stat for this turn.","color":"#3da84a","realArt":"art/0020Lunaris The Silver Beast.png"},{"id":"#0021","name":"Eldriana The Cleansing Flame","factions":["pure","infernal"],"souls":6,"abilityName":"Blue Flame","desc":"Whenever a \"Pure\" faction creature you control is destroyed this round, summon an \"infernal\" creature with cost 3 or less from your deck.","color":"#3da84a","realArt":"art/0021EldrianaTheCleansingFlame.png"},{"id":"#0022","name":"Zirith Of The Mirror Ways","factions":["pure","tainted"],"souls":6,"abilityName":"Mirrored Conversion","desc":"Choose a player. Place all cards in your hand into the void, shuffle, then draw that many cards.","color":"#3da84a","realArt":"art/0022ZirithOfTheMirrorWays.png"},{"id":"#0023","name":"Visera Stealer of Souls","factions":["pure","cursed"],"souls":5,"abilityName":"Soul Stealer","desc":"During your turn, steal 1 soul from your opponent\"s soul jar for each \"cursed\" or \"pure\" creature on the field.","color":"#3da84a","realArt":"art/0023ViseraStealerofSouls.png"},{"id":"#0028","name":"Brassen Bullseye","factions":["beast","infernal"],"souls":4,"abilityName":"Raging Bull","desc":"Choose a creature you control. It gains \"Burning Cloak\".","color":"#3da84a","realArt":"art/0028BrassenBullseye.png"},{"id":"#0031","name":"Xorath The Corrupt Statue","factions":["tainted","infernal"],"souls":7,"abilityName":"Corrupt Dominion","desc":"All enemy creatures lose 2 attack this turn. For each enemy creature destroyed this way, gain 1 Tainted or Infernal soul.","color":"#c94f8a","realArt":"art/0031Xorath The Corrupt Statue.png"},{"id":"#0032","name":"Malceron The Burned","factions":["infernal","cursed"],"souls":6,"abilityName":"Corrupt Dominion","desc":"For 1 turn, whenever a creature you control dies, deal 2 damage to a creature your opponent controls.","color":"#d63030","realArt":"art/0032MalceronTheBurned.png"},{"id":"#0033","name":"Morvath The Unholy Revenant","factions":["tainted","cursed"],"souls":5,"abilityName":"Unholy Seal","desc":"Your opponents Immortal card cannot be used this round and next round the cost is +1.","color":"#8e3fe0","realArt":"art/0033MorvathTheUnholyRevanent.png"}],
        creatures: [{"id":"p1","name":"Tide Warden","type":"pure","atk":2,"def":4,"cost":2,"art":"🌊","ability":"Shield","desc":"Reflect 1 damage when defending against an attack."},{"id":"p2","name":"Mist Phantom","type":"pure","atk":3,"def":2,"cost":2,"art":"👁️","ability":"Dash","desc":"Can attack the turn it is summoned."},{"id":"p3","name":"Runic Guardian","type":"pure","atk":2,"def":5,"cost":3,"art":"🗿","ability":"Stalwart","desc":"+1 DEF at end of each turn it survives."},{"id":"p4","name":"Frost Seer","type":"pure","atk":1,"def":3,"cost":2,"art":"🔮","ability":"Foresight","desc":"Draw 1 extra card when summoned."},{"id":"p5","name":"Wave Breaker","type":"pure","atk":3,"def":3,"cost":3,"art":"🌀","ability":"Ripple","desc":"Deals 1 damage to adjacent enemy on attack."},{"id":"p6","name":"Crystal Monk","type":"pure","atk":2,"def":4,"cost":3,"art":"💠","ability":"Clarity","desc":"Allies cannot be debuffed while this is on field."},{"id":"p7","name":"Tide Oracle","type":"pure","atk":4,"def":3,"cost":4,"art":"🌊","ability":"Flow","desc":"+1 ATK for each pure soul you have (max +3)."},{"id":"p8","name":"Ether Drake","type":"pure","atk":5,"def":2,"cost":4,"art":"🐬","ability":"Phaseshift","desc":"Cannot be counter-attacked by defence mode cards."},{"id":"t1","name":"Grave Wraith","type":"tainted","atk":4,"def":1,"cost":2,"art":"💀","ability":"Reap","desc":"On kill: gain 1 soul of the killed card's type."},{"id":"t2","name":"Bone Revenant","type":"tainted","atk":3,"def":3,"cost":3,"art":"🦴","ability":"Undying","desc":"Returns to your hand once when destroyed."},{"id":"t3","name":"Soul Leech","type":"tainted","atk":2,"def":2,"cost":1,"art":"🩸","ability":"Drain","desc":"+1 direct damage when attacking the player."},{"id":"t4","name":"Plague Bearer","type":"tainted","atk":2,"def":3,"cost":2,"art":"🫀","ability":"Rot","desc":"Enemy hit by this loses 1 ATK permanently."},{"id":"t5","name":"Lich Overseer","type":"tainted","atk":4,"def":4,"cost":5,"art":"🧟","ability":"Command","desc":"When summoned, draw 1 card from the void."},{"id":"t6","name":"Necrotic Swarm","type":"tainted","atk":1,"def":1,"cost":1,"art":"🐛","ability":"Multiply","desc":"On kill, summon another Swarm in its place."},{"id":"t7","name":"Shroud Walker","type":"tainted","atk":3,"def":2,"cost":2,"art":"🌑","ability":"Vanish","desc":"Cannot be targeted by Eternal or bypass abilities."},{"id":"t8","name":"Voidcaller","type":"tainted","atk":3,"def":3,"cost":4,"art":"🕯️","ability":"Summon","desc":"On summon, add a random tainted card to your hand."},{"id":"d1","name":"Seraph Blade","type":"divine","atk":4,"def":3,"cost":3,"art":"🪽","ability":"Holy","desc":"+1 bonus damage against Infernal cards."},{"id":"d2","name":"Oracle Light","type":"divine","atk":1,"def":4,"cost":2,"art":"☀️","ability":"Mend","desc":"One ally gains +1 DEF at the start of each turn."},{"id":"d3","name":"Arbiter","type":"divine","atk":3,"def":4,"cost":4,"art":"⚖️","ability":"Eternal","desc":"Can bypass all monsters and attack player directly."},{"id":"d4","name":"Radiant Monk","type":"divine","atk":2,"def":4,"cost":3,"art":"🕊️","ability":"Bless","desc":"When summoned, remove all seals from allies."},{"id":"d5","name":"Sun Paladin","type":"divine","atk":3,"def":5,"cost":4,"art":"🛡️","ability":"Martyr","desc":"On death, restore 3 DEF to one ally."},{"id":"d6","name":"Gilded Cherub","type":"divine","atk":2,"def":3,"cost":2,"art":"👼","ability":"Sanctify","desc":"Adjacent allies take 1 less damage."},{"id":"d7","name":"Holy Arbiter","type":"divine","atk":4,"def":4,"cost":5,"art":"⚔️","ability":"Smite","desc":"+2 ATK vs Tainted cards."},{"id":"i1","name":"Hellhound","type":"infernal","atk":5,"def":1,"cost":2,"art":"🔥","ability":"Dash","desc":"Can attack the turn it is summoned."},{"id":"i2","name":"Ashborn","type":"infernal","atk":4,"def":2,"cost":2,"art":"💢","ability":"Aggravate","desc":"Enemies must attack this card before any other."},{"id":"i3","name":"Inferno Drake","type":"infernal","atk":6,"def":2,"cost":4,"art":"🐲","ability":"Burn","desc":"+1 damage on all attacks dealt."},{"id":"i4","name":"Ember Fiend","type":"infernal","atk":3,"def":2,"cost":2,"art":"😈","ability":"Ignite","desc":"At end of your turn, deal 1 damage to a random enemy."},{"id":"i5","name":"Char Titan","type":"infernal","atk":5,"def":4,"cost":5,"art":"🌋","ability":"Inferno","desc":"All enemies take 1 damage when summoned."},{"id":"i6","name":"Cinder Imp","type":"infernal","atk":2,"def":1,"cost":1,"art":"👿","ability":"Spark","desc":"On death, deal 2 damage to a random enemy."},{"id":"i7","name":"Magma Sentinel","type":"infernal","atk":4,"def":4,"cost":4,"art":"🪨","ability":"Molten","desc":"Reduces enemy DEF by 1 on each successful hit."},{"id":"b1","name":"Iron Colossus","type":"beast","atk":5,"def":5,"cost":5,"art":"🗜️","ability":"Trample","desc":"Excess kill damage carries through to the player."},{"id":"b2","name":"Pack Leader","type":"beast","atk":3,"def":3,"cost":3,"art":"🐺","ability":"Rally","desc":"+1 ATK to all allied Beast cards on the field."},{"id":"b3","name":"Spore Shambler","type":"beast","atk":2,"def":6,"cost":3,"art":"🍄","ability":"Regenerate","desc":"Restores 1 DEF at the start of your turn."},{"id":"b4","name":"Rampaging Boar","type":"beast","atk":4,"def":2,"cost":3,"art":"🐗","ability":"Charge","desc":"Deals double damage on first attack after summoning."},{"id":"b5","name":"Elder Tortoise","type":"beast","atk":1,"def":8,"cost":4,"art":"🐢","ability":"Fortress","desc":"Allies in adjacent slots gain +1 DEF."},{"id":"b6","name":"Razorclaw","type":"beast","atk":4,"def":3,"cost":3,"art":"🦁","ability":"Pounce","desc":"Deals +1 damage for each beast ally on field."},{"id":"b7","name":"Swamp Horror","type":"beast","atk":3,"def":5,"cost":4,"art":"🐊","ability":"Ensnare","desc":"Attacked enemy cannot switch modes next turn."},{"id":"c1","name":"Hex Binder","type":"cursed","atk":2,"def":3,"cost":2,"art":"🌀","ability":"Seal","desc":"Prevents one enemy card from acting for 1 turn."},{"id":"c2","name":"Void Stalker","type":"cursed","atk":4,"def":1,"cost":3,"art":"🕳️","ability":"Phase","desc":"Cannot be targeted by magic or abilities."},{"id":"c3","name":"Dusk Weaver","type":"cursed","atk":3,"def":3,"cost":4,"art":"🕸️","ability":"Curse","desc":"-1 ATK to all enemies while this is on the field."},{"id":"c4","name":"Shadow Twin","type":"cursed","atk":2,"def":2,"cost":2,"art":"👥","ability":"Mirror","desc":"Copies one ability from an adjacent ally on enter."},{"id":"c5","name":"Abyssal Reveler","type":"cursed","atk":4,"def":3,"cost":4,"art":"🎭","ability":"Chaos","desc":"Randomly buffs or debuffs one card by 1 at end of turn."},{"id":"c6","name":"Plague Sprite","type":"cursed","atk":2,"def":2,"cost":1,"art":"🧿","ability":"Jinx","desc":"Reduces a summoned enemy's ATK by 1 on entry."},{"id":"c7","name":"Nightmare Hound","type":"cursed","atk":4,"def":2,"cost":3,"art":"🐾","ability":"Terror","desc":"Enemy cards in defence mode take +1 damage."},{"id":"n01","name":"Wandering Soul","type":"neutral","atk":2,"def":2,"cost":1,"art":"👻","ability":"Drift","desc":"On entering field, add 1 random soul to your jar."},{"id":"n02","name":"Iron Golem","type":"neutral","atk":3,"def":4,"cost":3,"art":"🗿","ability":"Armour","desc":"Takes 1 less damage from each attack (min 1)."},{"id":"n03","name":"Stone Sentinel","type":"neutral","atk":1,"def":6,"cost":3,"art":"🪨","ability":"Stalwart","desc":"+1 DEF each turn it survives on the field."},{"id":"n04","name":"Runic Scribe","type":"neutral","atk":1,"def":2,"cost":1,"art":"📜","ability":"Inscribe","desc":"When summoned, draw 1 card from your deck."},{"id":"n05","name":"Hired Blade","type":"neutral","atk":4,"def":1,"cost":2,"art":"🗡️","ability":"Dash","desc":"Can attack the turn it is summoned."},{"id":"n06","name":"Tavern Brawler","type":"neutral","atk":3,"def":3,"cost":2,"art":"💪","ability":"Brawl","desc":"+1 ATK when attacking a card with higher DEF."},{"id":"n07","name":"Mirror Mage","type":"neutral","atk":2,"def":3,"cost":2,"art":"🪞","ability":"Reflect","desc":"Reflects 1 damage back on each attack."},{"id":"n08","name":"Road Veteran","type":"neutral","atk":2,"def":3,"cost":2,"art":"🧳","ability":"Hardy","desc":"Cannot be affected by Seal or Curse abilities."},{"id":"n09","name":"Plague Rat","type":"neutral","atk":2,"def":1,"cost":1,"art":"🐀","ability":"Swarm","desc":"When destroyed, summon another 1/1 Plague Rat."},{"id":"n10","name":"Ancient Remnant","type":"neutral","atk":3,"def":5,"cost":4,"art":"🏺","ability":"Eternal","desc":"Can bypass all monsters and attack player directly."},{"id":"n11","name":"Soul Ferrier","type":"neutral","atk":1,"def":2,"cost":1,"art":"⛵","ability":"Passage","desc":"On kill, gain 1 soul matching the killed card type."},{"id":"n12","name":"Bone Archer","type":"neutral","atk":3,"def":1,"cost":2,"art":"🏹","ability":"Volley","desc":"Deals 1 damage to a random enemy on enter."}],
        rifts:     [{"id":"#0034","name":"Rift of Lightning","type":"rift","atk":0,"def":0,"cost":4,"timerRounds":3,"art":"⚡","ability":"Void Absorption","rarity":"bronze","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0034RiftOfLightning.png"},{"id":"#0035","name":"Rift of Flames","type":"rift","atk":0,"def":0,"cost":5,"timerRounds":4,"art":"🔥","ability":"Void Absorption","rarity":"bronze","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0035RiftOfFlames.png"},{"id":"#0036","name":"Voidless Rift","type":"rift","atk":0,"def":0,"cost":5,"timerRounds":5,"art":"🌀","ability":"Void Absorption","rarity":"gold","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0036VoidlessRift.png"},{"id":"#0037","name":"Rift of Water","type":"rift","atk":0,"def":0,"cost":6,"timerRounds":5,"art":"🌊","ability":"Void Absorption","rarity":"bronze","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0037RiftOfWater.png"},{"id":"#0038","name":"Rift of Ice","type":"rift","atk":0,"def":0,"cost":4,"timerRounds":3,"art":"❄️","ability":"Void Absorption","rarity":"bronze","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0038RiftOfIce.png"},{"id":"#0039","name":"Rift of Darkness","type":"rift","atk":0,"def":0,"cost":5,"timerRounds":4,"art":"🌑","ability":"Void Absorption","rarity":"bronze","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0039RiftOfDarkness.png"},{"id":"#0040","name":"Flame Spire Rift","type":"rift","atk":0,"def":0,"cost":5,"timerRounds":4,"art":"🔱","ability":"Void Absorption","rarity":"silver","desc":"Gains the combined ATK and DEF of all your field creatures. Those creatures are sent to the void.","isRift":true,"realArt":"rift/0040FlameSpireRift.png"}],
    };

    /**
     * Try to fetch a JSON file; return fallback data on failure.
     * @param {string} key - data key (factions, immortals, creatures, rifts)
     * @returns {Promise<Array>}
     */
    static async _fetch(key) {
        try {
            const resp = await fetch(CardLoader.PATHS[key]);
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return await resp.json();
        } catch (err) {
            console.warn('[CardLoader] JSON fetch failed for ' + key + ', using embedded fallback.');
            return CardLoader.FALLBACK[key];
        }
    }

    /**
     * Load all card data. Tries JSON files first, falls back to embedded data.
     * Populates FACTIONS, IMMORTALS, FACTION_CARDS, NEUTRALS, RIFTS, ALL_CARDS.
     * @returns {Promise<void>}
     */
    static async loadAll() {
        const [factions, immortals, creatures, rifts] = await Promise.all([
            CardLoader._fetch('factions'),
            CardLoader._fetch('immortals'),
            CardLoader._fetch('creatures'),
            CardLoader._fetch('rifts'),
        ]);

        FACTIONS = factions;
        IMMORTALS = immortals;
        FACTION_CARDS = creatures.filter(c => c.type !== 'neutral');
        NEUTRALS = creatures.filter(c => c.type === 'neutral');
        RIFTS = rifts;
        ALL_CARDS = [...FACTION_CARDS, ...NEUTRALS, ...RIFTS];

        console.log(
            '[CardLoader] Loaded: ' + FACTIONS.length + ' factions, ' +
            IMMORTALS.length + ' immortals, ' + FACTION_CARDS.length + ' faction cards, ' +
            NEUTRALS.length + ' neutrals, ' + RIFTS.length + ' rifts'
        );
    }
}


const SOUL_TYPES = ['pure', 'tainted', 'divine', 'infernal', 'beast', 'cursed'];
const SOUL_CAP = 8; // Maximum souls per type in a jar


// ═══════════════════════════════════════════════════════════════════
//  PHASE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

const PHASES = [
    { id: 'start', label: 'Start Phase', icon: '⚑' },
    { id: 'draw', label: 'Draw Phase', icon: '🃏' },
    { id: 'roll', label: 'Roll Phase', icon: '🎲' },
    { id: 'placement', label: 'Placement Phase', icon: '⚔' },
    { id: 'fight', label: 'Fight Phase', icon: '💀' },
    { id: 'end', label: 'End Phase', icon: '⏎' },
];

// ═══════════════════════════════════════════════════════════════════
//  SCREEN MANAGER — handles screen transitions & floating cards
// ═══════════════════════════════════════════════════════════════════

class ScreenManager {
    constructor() {
        this._menuCardRAF = null;  // requestAnimationFrame handle
        this._menuCards = [];    // floating card state array
    }

    /** Transition from one screen to another by toggling .active class */
    go(from, to) {
        // Stop the game completely when leaving the game screen
        if (from === 'game-screen' && app.game) {
            app.game.stopGame();
        }
        document.getElementById(from).classList.remove('active');
        document.getElementById(to).classList.add('active');
        // Re-init floating cards on title/menu screens
        if (to === 'menu-screen' || to === 'title-screen') this.initMenuCards();
        if (from === 'menu-screen' && to !== 'title-screen') this.stopMenuCards();
        if (from === 'title-screen' && to !== 'menu-screen') this.stopMenuCards();
    }

    /** Stop and remove all floating immortal card animations */
    stopMenuCards() {
        if (this._menuCardRAF) { cancelAnimationFrame(this._menuCardRAF); this._menuCardRAF = null; }
        this._menuCards = [];
        ['menuFloatBg', 'titleFloatBg'].forEach(id => {
            const bg = document.getElementById(id);
            if (bg) bg.innerHTML = '';
        });
    }

    /** Spawn floating immortal art cards in a background container */
    spawnFloatCards(bgId, count) {
        const bg = document.getElementById(bgId);
        if (!bg) return;
        const pool = [...IMMORTALS].filter(im => im.realArt);
        const picks = pool.sort(() => Math.random() - .5).slice(0, Math.min(count, pool.length));
        const W = window.innerWidth, H = window.innerHeight;

        picks.forEach((im, i) => {
            const w = 90 + Math.random() * 40;
            const h = w * 1.4;
            const startX = W * 0.05 + Math.random() * (W * 0.90) - w / 2;
            const startY = H + 20 + i * (H / count);

            const el = document.createElement('div');
            el.className = 'menu-float-card';
            el.style.cssText = `width:${w}px;height:${h}px;opacity:0;position:absolute;left:${startX}px;top:${startY}px;transform:rotate(0deg);`;
            el.innerHTML = `<img src="${UIRenderer.encodeArtPath(im.realArt)}" alt="${im.name}" onerror="this.style.display='none'">`;
            bg.appendChild(el);

            setTimeout(() => {
                el.style.transition = 'opacity 2s';
                el.style.opacity = (0.10 + Math.random() * 0.10).toFixed(2);
            }, i * 500);

            this._menuCards.push({ el, x: startX, y: startY, w, h, speed: 0.25 + Math.random() * 0.20, screenH: H, screenW: W });
        });
    }

    /** Start the floating card animation loop on title + menu */
    initMenuCards() {
        this.stopMenuCards();
        this.spawnFloatCards('menuFloatBg', 5);
        this.spawnFloatCards('titleFloatBg', 5);

        const tick = () => {
            this._menuCards.forEach(c => {
                c.y -= c.speed;
                c.el.style.top = c.y + 'px';
                if (c.y + c.h < 0) {
                    c.x = c.screenW * 0.05 + Math.random() * (c.screenW * 0.90) - c.w / 2;
                    c.y = c.screenH + 10;
                    c.el.style.left = c.x + 'px';
                    c.el.style.opacity = (0.10 + Math.random() * 0.10).toFixed(2);
                }
            });
            this._menuCardRAF = requestAnimationFrame(tick);
        };
        this._menuCardRAF = requestAnimationFrame(tick);
    }
}

// ═══════════════════════════════════════════════════════════════════
//  ANIMATION MANAGER — summon, attack, direct hit, immortal FX
// ═══════════════════════════════════════════════════════════════════

class AnimationManager {

    /** Get centre screen coords of a DOM element */
    elCenter(el) {
        if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    /** Get faction colour for a card or immortal type id */
    factionColor(typeId) {
        const f = FACTIONS.find(x => x.id === typeId);
        return f ? f.color : '#d4a843';
    }

    /** Soul-mist summon animation over a field slot */
    animSummon(slotEl, card) {
        return new Promise(resolve => {
            const color = this.factionColor(card.type);
            const rect = slotEl ? slotEl.getBoundingClientRect()
                : { left: window.innerWidth / 2 - 40, top: window.innerHeight / 2 - 60, width: 80, height: 120 };
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Card scale-in entrance
            if (slotEl) {
                slotEl.style.transition = 'transform .35s cubic-bezier(.2,1.4,.5,1), opacity .25s';
                slotEl.style.transform = 'scale(0.3)';
                slotEl.style.opacity = '0';
                requestAnimationFrame(() => {
                    slotEl.style.transform = 'scale(1)';
                    slotEl.style.opacity = '1';
                    setTimeout(() => { slotEl.style.transition = ''; slotEl.style.transform = ''; }, 400);
                });
            }

            // Expanding ring pulse
            const ring = document.createElement('div');
            ring.className = 'summon-ring';
            ring.style.cssText = `left:${cx}px;top:${cy}px;border-color:${color};box-shadow:0 0 20px ${color}88,inset 0 0 20px ${color}44;`;
            document.body.appendChild(ring);
            setTimeout(() => ring.remove(), 800);

            // Screen edge flash
            const flash = document.createElement('div');
            flash.className = 'summon-flash';
            flash.style.background = `radial-gradient(ellipse at ${cx}px ${cy}px, ${color}55 0%, transparent 60%)`;
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 600);

            // Rising soul mist particles (more + varied)
            for (let i = 0; i < 18; i++) {
                setTimeout(() => {
                    const p = document.createElement('div');
                    p.className = 'soul-mist-particle';
                    const size = 4 + Math.random() * 18;
                    const offX = (Math.random() - .5) * rect.width * 1.6;
                    const dur = 800 + Math.random() * 500;
                    p.style.cssText = `width:${size}px;height:${size}px;left:${cx + offX - size / 2}px;top:${cy + 20}px;background:radial-gradient(circle,${color}dd 0%,${color}00 100%);animation-duration:${dur}ms;`;
                    document.body.appendChild(p);
                    setTimeout(() => p.remove(), dur + 200);
                }, i * 25);
            }

            // Central sigil (bigger, brighter)
            const SIGILS = ['✦', '◆', '⟁', '✧', '❋', '⚝'];
            const sigil = document.createElement('div');
            sigil.className = 'soul-sigil';
            sigil.textContent = SIGILS[Math.floor(Math.random() * SIGILS.length)];
            sigil.style.cssText = `left:${cx}px;top:${cy}px;transform:translate(-50%,-50%);color:${color};font-size:2.8rem;`;
            document.body.appendChild(sigil);
            setTimeout(() => sigil.remove(), 1100);
            setTimeout(resolve, 650);
        });
    }

    /** Slash attack animation from attacker to defender slot */
    animAttack(atkEl, defEl, color = '#d4a843') {
        return new Promise(resolve => {
            const a = this.elCenter(atkEl);
            const d = this.elCenter(defEl);
            const dx = d.x - a.x, dy = d.y - a.y;
            const length = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Attacker lunge
            if (atkEl) {
                atkEl.style.transition = 'transform .15s ease-in';
                atkEl.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
                setTimeout(() => { atkEl.style.transition = 'transform .25s ease-out'; atkEl.style.transform = ''; }, 150);
            }

            // Main slash beam (thicker + glow)
            const slash = document.createElement('div');
            slash.className = 'attack-slash';
            slash.style.cssText = `left:${a.x}px;top:${a.y}px;width:${length}px;height:5px;background:linear-gradient(90deg,${color}00,${color}ff,${color}ee,${color}88);transform:rotate(${angle}deg);box-shadow:0 0 12px ${color},0 0 24px ${color}66;`;
            document.body.appendChild(slash);
            setTimeout(() => slash.remove(), 500);

            // Impact on target
            setTimeout(() => {
                // Impact burst
                const IMPACTS = ['💥', '⚡', '✦', '💢'];
                const burst = document.createElement('div');
                burst.className = 'impact-burst';
                burst.textContent = IMPACTS[Math.floor(Math.random() * IMPACTS.length)];
                burst.style.cssText = `left:${d.x}px;top:${d.y}px;transform:translate(-50%,-50%);color:${color};font-size:2.4rem;`;
                document.body.appendChild(burst);
                setTimeout(() => burst.remove(), 750);

                // Sparks flying from impact
                for (let i = 0; i < 8; i++) {
                    const spark = document.createElement('div');
                    spark.className = 'hit-spark';
                    const ang = (Math.random() * Math.PI * 2);
                    const dist = 30 + Math.random() * 50;
                    spark.style.cssText = `left:${d.x}px;top:${d.y}px;--sx:${Math.cos(ang) * dist}px;--sy:${Math.sin(ang) * dist}px;background:${color};`;
                    document.body.appendChild(spark);
                    setTimeout(() => spark.remove(), 600);
                }

                // Card shake (stronger)
                if (defEl) { defEl.classList.add('card-shake'); setTimeout(() => defEl.classList.remove('card-shake'), 450); }

                // Screen micro-shake
                document.body.classList.add('screen-shake');
                setTimeout(() => document.body.classList.remove('screen-shake'), 300);
            }, 180);

            setTimeout(resolve, 550);
        });
    }

    /** Direct hit animation (no target card — strikes player) */
    animDirectHit(atkEl, color = '#d4a843') {
        return new Promise(resolve => {
            const a = this.elCenter(atkEl);
            const tx = window.innerWidth / 2;
            const ty = window.innerHeight / 2;
            const dx = tx - a.x, dy = ty - a.y;
            const length = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            // Slash beam
            const slash = document.createElement('div');
            slash.className = 'attack-slash';
            slash.style.cssText = `left:${a.x}px;top:${a.y}px;width:${length}px;height:5px;background:linear-gradient(90deg,${color}00,${color}ff,#ff4040ee,#ff404044);transform:rotate(${angle}deg);box-shadow:0 0 12px ${color},0 0 20px #ff404066;`;
            document.body.appendChild(slash);
            setTimeout(() => slash.remove(), 500);

            setTimeout(() => {
                // Skull burst
                const burst = document.createElement('div');
                burst.className = 'impact-burst';
                burst.textContent = '💀';
                burst.style.cssText = `left:${tx}px;top:${ty}px;transform:translate(-50%,-50%);color:#ff4040;font-size:2.8rem;`;
                document.body.appendChild(burst);
                setTimeout(() => burst.remove(), 750);

                // Red vignette flash
                const vig = document.createElement('div');
                vig.className = 'direct-hit-vignette';
                document.body.appendChild(vig);
                setTimeout(() => vig.remove(), 600);

                // Screen shake (stronger for direct hit)
                document.body.classList.add('screen-shake-heavy');
                setTimeout(() => document.body.classList.remove('screen-shake-heavy'), 400);
            }, 180);

            setTimeout(resolve, 550);
        });
    }

    /** Death/destroy animation — card shatters into fragments */
    animDeath(slotEl, color = '#d4a843') {
        return new Promise(resolve => {
            if (!slotEl) { resolve(); return; }
            const rect = slotEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Card shrink + fade
            slotEl.style.transition = 'transform .35s ease-in, opacity .35s ease-in, filter .35s';
            slotEl.style.transform = 'scale(0.6) rotate(5deg)';
            slotEl.style.opacity = '0.3';
            slotEl.style.filter = 'brightness(2) saturate(0)';

            // Shatter fragments
            for (let i = 0; i < 12; i++) {
                const frag = document.createElement('div');
                frag.className = 'death-fragment';
                const size = 4 + Math.random() * 10;
                const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
                const dist = 40 + Math.random() * 60;
                frag.style.cssText = `left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${color};--fx:${Math.cos(ang) * dist}px;--fy:${Math.sin(ang) * dist}px;animation-delay:${Math.random() * 80}ms;`;
                document.body.appendChild(frag);
                setTimeout(() => frag.remove(), 700);
            }

            // Soul escape (ghost particles rising)
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const ghost = document.createElement('div');
                    ghost.className = 'death-soul';
                    const offX = (Math.random() - .5) * 40;
                    ghost.style.cssText = `left:${cx + offX}px;top:${cy}px;color:${color};`;
                    ghost.textContent = '✦';
                    document.body.appendChild(ghost);
                    setTimeout(() => ghost.remove(), 1000);
                }, i * 60);
            }

            // Red flash at death point
            const flash = document.createElement('div');
            flash.className = 'death-flash';
            flash.style.cssText = `left:${cx}px;top:${cy}px;background:${color};`;
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 500);

            // Reset slot style after animation
            setTimeout(() => {
                slotEl.style.transition = '';
                slotEl.style.transform = '';
                slotEl.style.opacity = '';
                slotEl.style.filter = '';
                resolve();
            }, 400);
        });
    }

    /** Full-screen immortal ability activation effect */
    animImmortal(immortal, label = '') {
        return new Promise(resolve => {
            const color = this.factionColor(immortal.factions?.[0] || 'neutral');
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            // Screen tint
            const flash = document.createElement('div');
            flash.className = 'immortal-screen-flash';
            flash.style.background = color;
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 850);

            // Runic ring
            const ring = document.createElement('div');
            ring.className = 'runic-ring';
            ring.style.cssText = `left:${cx}px;top:${cy}px;border-color:${color};color:${color};`;
            document.body.appendChild(ring);
            setTimeout(() => ring.remove(), 1050);

            // Soul sigils orbiting
            ['◈', '⟁', '✦', '◆', '✧'].forEach((s, i) => {
                setTimeout(() => {
                    const sig = document.createElement('div');
                    sig.className = 'soul-sigil';
                    const r = 90 + Math.random() * 60;
                    const ang = (i / 5) * Math.PI * 2;
                    sig.style.cssText = `left:${cx + Math.cos(ang) * r}px;top:${cy + Math.sin(ang) * r}px;transform:translate(-50%,-50%);color:${color};font-size:1.6rem;`;
                    document.body.appendChild(sig);
                    setTimeout(() => sig.remove(), 1000);
                }, i * 80);
            });

            // Ability name text
            const txt = document.createElement('div');
            txt.className = 'immortal-aura-text';
            txt.textContent = label || (immortal.abilityName || 'IMMORTAL AWAKENS');
            txt.style.cssText = `left:50%;top:50%;transform:translate(-50%,-50%);color:${color};`;
            document.body.appendChild(txt);
            setTimeout(() => txt.remove(), 1300);
            setTimeout(resolve, 900);
        });
    }

    /** Flash the big phase name announcement in the centre of the screen */
    announcePhase(label) {
        if (app.game && app.game._aborted) return Promise.resolve();
        return new Promise(resolve => {
            const el = document.getElementById('phaseAnnounceText');
            el.textContent = label;
            el.classList.remove('playing');
            void el.offsetWidth; // force reflow to restart animation
            el.classList.add('playing');
            setTimeout(() => { el.classList.remove('playing'); resolve(); }, 1800);
        });
    }

    /** Red combat flash overlay */
    flashCombat() {
        const e = document.getElementById('cf');
        e.classList.add('show');
        setTimeout(() => e.classList.remove('show'), 280);
    }

    /** Floating text effect */
    showFloat(txt, color) {
        const e = document.createElement('div');
        e.className = 'ft';
        e.textContent = txt;
        e.style.cssText += `;color:${color};left:50%;top:40%;transform:translate(-50%,-50%)`;
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 1100);
    }
}

// ═══════════════════════════════════════════════════════════════════
//  TOOLTIP MANAGER — card/rift/immortal tooltips with hover delay
// ═══════════════════════════════════════════════════════════════════

class TooltipManager {
    constructor() {
        this.el = null;            // tooltip DOM element (set after DOM ready)
        this.hoverEnabled = true;  // settings toggle
        this._timer = null;        // delay timer handle
        this._DELAY = 2000;        // hover delay in ms
    }

    /** Bind to the tooltip DOM element (call after DOMContentLoaded) */
    init() {
        this.el = document.getElementById('cardTooltip');
    }

    /** Position tooltip near the mouse cursor */
    _position(e) {
        const TT = this.el;
        const x = e.clientX, y = e.clientY, w = 220, h = TT.offsetHeight || 200;
        let l = x + 14, t = y - h / 2;
        if (l + w > window.innerWidth - 10) l = x - w - 14;
        if (t < 6) t = 6;
        if (t + h > window.innerHeight - 6) t = window.innerHeight - h - 6;
        TT.style.left = l + 'px';
        TT.style.top = t + 'px';
    }

    /** Show a creature card tooltip (with delay) */
    showTooltip(card, e) {
        clearTimeout(this._timer);
        if (!this.hoverEnabled || !card) return;
        this._timer = setTimeout(() => this._displayCard(card, e), this._DELAY);
    }

    /** Show a rift card tooltip (with delay) */
    showRiftTooltip(card, e) {
        clearTimeout(this._timer);
        if (!this.hoverEnabled) return;
        this._timer = setTimeout(() => this._displayRift(card, e), this._DELAY);
    }

    /** Show an immortal tooltip (with delay) */
    showImmortalTooltip(im, e) {
        clearTimeout(this._timer);
        if (!this.hoverEnabled) return;
        this._timer = setTimeout(() => this._displayImmortal(im, e), this._DELAY);
    }

    /** Hide tooltip and cancel any pending timer */
    hideTooltip() {
        clearTimeout(this._timer);
        this.el.classList.remove('show');
    }

    /** Toggle hover info setting */
    toggleHover() {
        this.hoverEnabled = !this.hoverEnabled;
        const btn = document.getElementById('hoverToggleBtn');
        if (this.hoverEnabled) { btn.textContent = 'ON'; btn.classList.remove('off'); }
        else { btn.textContent = 'OFF'; btn.classList.add('off'); this.hideTooltip(); }
    }

    // ── Internal display methods (called after delay) ──

    _displayCard(card, e) {
        const TT = this.el;
        const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
        const rar = card.rarity || 'bronze';
        TT.style.borderColor = f.color;
        TT.style.boxShadow = `0 12px 48px rgba(0,0,0,.97),0 0 20px ${f.color}44`;
        const img = document.getElementById('ttImg');
        const artEl = document.getElementById('ttArt');
        if (card.realArt) {
            img.src = UIRenderer.encodeArtPath(card.realArt); img.classList.add('has-img');
            img.onerror = () => { img.src = ''; img.classList.remove('has-img'); artEl.style.display = ''; };
            img.style.borderBottomColor = f.color + '55';
            artEl.style.display = 'none';
        } else {
            img.src = ''; img.classList.remove('has-img');
            artEl.style.display = '';
            artEl.style.textShadow = `0 0 20px ${f.color}`;
        }
        document.getElementById('ttName').textContent = card.name;
        document.getElementById('ttType').innerHTML = `<span style="color:${f.color}">${f.icon} ${f.name}</span>`;
        artEl.textContent = card.art;
        document.getElementById('ttAtk').textContent = card.curAtk !== undefined ? card.curAtk : card.atk;
        document.getElementById('ttDef').textContent = card.curDef !== undefined ? card.curDef : card.def;
        document.getElementById('ttCost').textContent = card.cost;
        document.getElementById('ttAbl').textContent = `✦ ${card.ability}`;
        document.getElementById('ttDesc').textContent = card.desc;
        const extra = document.getElementById('ttExtra');
        if (card.mode) {
            extra.innerHTML = `<span class="tt-mode ${card.mode}">${card.mode === 'attack' ? '⚔️ Attack' : '🛡 Defence'}</span>${card.summoned ? ' — <em>Summoning sickness</em>' : ''}<br><span class="tt-rarity ${rar}">${rar}</span>`;
        } else {
            extra.innerHTML = `Soul cost: ${card.cost} &nbsp;<span class="tt-rarity ${rar}">${rar}</span>`;
        }
        this._position(e);
        TT.classList.add('show');
    }

    _displayRift(card, e) {
        const TT = this.el;
        const rar = card.rarity || 'gold';
        const rarColor = { gold: '#d4a843', silver: '#b0b8c8', bronze: '#b87333' }[rar] || '#d4a843';
        TT.style.borderColor = rarColor;
        TT.style.boxShadow = `0 12px 48px rgba(0,0,0,.97),0 0 20px ${rarColor}55`;
        const img = document.getElementById('ttImg');
        const artEl = document.getElementById('ttArt');
        if (card.realArt) { img.src = UIRenderer.encodeArtPath(card.realArt); img.classList.add('has-img'); img.onerror = () => { img.src = ''; img.classList.remove('has-img'); artEl.style.display = ''; }; img.style.borderBottomColor = rarColor + '55'; artEl.style.display = 'none'; }
        else { img.src = ''; img.classList.remove('has-img'); artEl.style.display = ''; }
        document.getElementById('ttName').textContent = card.name;
        document.getElementById('ttType').innerHTML = '<span style="color:#d4a843;font-family:Cinzel,serif;letter-spacing:2px;">⚡ RIFT CARD</span>';
        artEl.textContent = card.art;
        document.getElementById('ttAtk').textContent = card.curAtk !== undefined ? card.curAtk : 0;
        document.getElementById('ttDef').textContent = card.curDef !== undefined ? card.curDef : 0;
        document.getElementById('ttCost').textContent = card.cost;
        document.getElementById('ttAbl').textContent = '✦ ' + card.ability;
        document.getElementById('ttDesc').textContent = card.desc;
        document.getElementById('ttExtra').innerHTML = `<span class="tt-rarity ${rar}">${rar}</span> · Timer: ${card.timerRounds || 5} rounds · Cost: ${card.cost} souls`;
        this._position(e);
        TT.classList.add('show');
    }

    _displayImmortal(im, e) {
        const TT = this.el;
        const fc = im.color || '#d4a843';
        const rar = im.rarity || 'gold';
        const rarColor = { gold: '#d4a843', silver: '#b0b8c8', bronze: '#b87333' }[rar] || '#d4a843';
        TT.style.borderColor = rarColor;
        TT.style.boxShadow = `0 12px 48px rgba(0,0,0,.97),0 0 20px ${rarColor}44`;
        const facNames = im.factions.map(f => {
            const fobj = FACTIONS.find(x => x.id === f);
            return fobj ? `<span style="color:${fobj.color}">${fobj.icon} ${fobj.name}</span>` : f;
        }).join(' · ');
        const img = document.getElementById('ttImg');
        const artEl = document.getElementById('ttArt');
        if (im.realArt) {
            img.src = UIRenderer.encodeArtPath(im.realArt); img.classList.add('has-img');
            img.onerror = () => { img.src = ''; img.classList.remove('has-img'); artEl.style.display = ''; };
            img.style.borderBottomColor = fc + '55';
            artEl.style.display = 'none';
        } else {
            img.src = ''; img.classList.remove('has-img');
            artEl.style.display = '';
            artEl.style.textShadow = `0 0 20px ${fc}`;
        }
        document.getElementById('ttName').textContent = im.name;
        document.getElementById('ttType').innerHTML = `<span style="color:${fc};font-family:Cinzel,serif;letter-spacing:2px;">✦ IMMORTAL ✦</span>`;
        artEl.textContent = im.art;
        document.getElementById('ttAtk').textContent = '—';
        document.getElementById('ttDef').textContent = '—';
        document.getElementById('ttCost').textContent = im.souls;
        document.getElementById('ttAbl').textContent = '✦ ' + im.abilityName;
        document.getElementById('ttDesc').textContent = im.desc;
        document.getElementById('ttExtra').innerHTML = facNames
            + `<br><span style="color:var(--dim);font-size:.45rem;">Soul cost to activate: ${im.souls}</span>`
            + ` &nbsp;<span class="tt-rarity ${rar}">${rar}</span>`;
        this._position(e);
        TT.classList.add('show');
    }
}

// ═══════════════════════════════════════════════════════════════════
//  UI RENDERER — card HTML, score track, soul jars, field, hand, log
// ═══════════════════════════════════════════════════════════════════

class UIRenderer {
    constructor(game) {
        this.game = game; // reference to Game instance for gs access
    }

    /** Encode realArt path for safe use in img src (handles #, ;, spaces) */
    static encodeArtPath(path) {
        if (!path) return '';
        // Split on '/' to preserve folder separators, encode each segment
        return path.split('/').map(seg => encodeURIComponent(seg)).join('/');
    }

    // ── Card HTML builders ──

    /** Inner card frame template shared by all card renderers */
    _cardInner(card, atk, def, extraCls = '') {
        const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
        const fc = f.color;
        const typeLabel = card.type === 'neutral' ? 'Neutral' : f.name.toUpperCase();
        const bgGrad = `linear-gradient(160deg, ${fc}22 0%, #0e0b14 60%)`;
        const descShort = (card.desc || '').length > 55 ? (card.desc || '').slice(0, 53) + '…' : card.desc || '';
        return `
    <div class="card-frame${extraCls}" style="border-color:${fc}99;background:${bgGrad};">
      <div class="c-header" style="border-bottom-color:${fc}66;">
        <div class="c-cost-badge" style="background:${fc}33;border-color:${fc}99;color:${fc};box-shadow:0 0 6px ${fc}88;">${card.cost}</div>
        <div class="c-type-lbl" style="color:${fc}cc;">${typeLabel}</div>
        <div class="c-fac-icon">${f.icon}</div>
      </div>
      <div class="c-namebar" style="border-bottom:1px solid ${fc}44;"><div class="c-name">${card.name}</div></div>
      <div class="c-art" style="--art-border:${fc}55;">
        <div class="c-art-inner" style="border-color:${fc}55;"></div>
        <span style="filter:drop-shadow(0 0 6px ${fc}88)">${card.art}</span>
      </div>
      <div class="c-sigil" style="--sigil-color:${fc};"><div class="c-sigil-gem" style="border-color:${fc}88;background:${fc}22;color:${fc};">◆</div></div>
      <div class="c-bottom" style="border-top-color:${fc}44;">
        <div class="c-abl-name" style="color:${fc}cc;">✦ ${card.ability}</div>
        <div class="c-abl-text">${descShort}</div>
      </div>
      <div class="c-stats" style="border-top-color:${fc}33;">
        <span class="cstat atk">⚔ ${atk}</span>
        <span class="cstat def">${def} 🛡</span>
      </div>
      <div class="c-sick" title="Summoning sickness">✦</div>
      <div class="c-seal" title="Sealed">🔒</div>
    </div>`;
    }

    /** Generic card HTML */
    cardHtml(card, cls = 'card') {
        const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
        const atk = card.curAtk !== undefined ? card.curAtk : card.atk;
        const def = card.curDef !== undefined ? card.curDef : card.def;
        return `<div class="${cls}" style="box-shadow:0 4px 16px ${f.color}22;">${this._cardInner(card, atk, def)}</div>`;
    }

    /** Field card HTML with mode, sickness, sealed states */
    fieldCardHtml(card, player, idx) {
        const gs = this.game.gs;
        const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
        const sick = card.summoned && card.ability !== 'Dash';
        const cls = ['card', card.mode === 'defense' ? 'def-mode' : '', sick ? 'sick' : '', gs.atkIdx === idx && player === 1 ? 'sel-card' : '', card.sealed ? 'sealed-c' : ''].filter(Boolean).join(' ');
        const extraFrame = card.sealed ? ' sealed-frame' : '';
        return `<div class="${cls}" data-cplayer="${player}" data-cidx="${idx}" style="box-shadow:0 4px 16px ${f.color}22;">${this._cardInner(card, card.curAtk, card.curDef, extraFrame)}</div>`;
    }

    /** Hand card HTML with selection highlight */
    handCardHtml(card, idx) {
        const gs = this.game.gs;
        const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
        const sel = gs.selectedHandIdx === idx;
        return `<div class="card${sel ? ' sel-card' : ''}" data-hidx="${idx}" style="box-shadow:0 4px 16px ${f.color}${sel ? '88' : '22'};">${this._cardInner(card, card.curAtk, card.curDef)}</div>`;
    }

    /** Rift card HTML with timer pips and optional stats overlay */
    riftCardHtml(card, extraCls = '') {
        const totalRounds = card.timerRounds || 5;
        const currentRound = card.riftRoundsLeft !== undefined ? card.riftRoundsLeft : totalRounds;
        const atk = card.curAtk !== undefined ? card.curAtk : card.atk;
        const def = card.curDef !== undefined ? card.curDef : card.def;
        const pips = [];
        for (let i = 1; i <= totalRounds; i++) {
            const isActive = i === currentRound;
            const isSpent = i < currentRound;
            pips.push(`<div class="rift-pip-dot${isSpent ? ' spent' : isActive ? ' active' : ''}">${i}</div>`);
        }
        const statsOverlay = card.summoned
            ? `<div class="rift-img-stats"><span class="rift-img-atk">${atk}</span><span class="rift-img-sep">/</span><span class="rift-img-def">${def}</span></div>`
            : '';
        const img = card.realArt
            ? `<img src="${UIRenderer.encodeArtPath(card.realArt)}" alt="${card.name}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:#111">${card.art}</div>`;
        return `<div class="rift-card-img${extraCls}" style="position:relative;">${img}<div class="rift-img-pips">${pips.join('')}</div>${statsOverlay}</div>`;
    }

    /** Immortal pick art for setup grid */
    immortalPickHtml(im) {
        return `<img src="${UIRenderer.encodeArtPath(im.realArt)}" alt="${im.name}" style="width:100%;height:100%;object-fit:contain;display:block;border-radius:8px;" onerror="this.onerror=null;this.style.display='none'">`;
    }

    /** Compact immortal art for in-game sidebar */
    immortalSidebarHtml(im) {
        if (!im.realArt) return null;
        return `<img src="${UIRenderer.encodeArtPath(im.realArt)}" alt="${im.name}" style="width:100%;height:auto;object-fit:contain;display:block;border-radius:6px;cursor:pointer;" title="Tap to activate: ${im.abilityName}">`;
    }

    // ── Score track ──

    buildScoreTrack() {
        const t = document.getElementById('scoreTrack');
        t.innerHTML = '';
        for (let i = 12; i >= 1; i--) {
            const d = document.createElement('div');
            d.className = 'sp sp-player'; d.id = 'sp_p' + i;
            t.appendChild(d);
        }
        const z = document.createElement('div');
        z.className = 'sp-zero'; z.textContent = '◆';
        t.appendChild(z);
        for (let i = 1; i <= 12; i++) {
            const d = document.createElement('div');
            d.className = 'sp sp-foe'; d.id = 'sp_f' + i;
            t.appendChild(d);
        }
    }

    updateScoreTrack() {
        const gs = this.game.gs;
        for (let i = 1; i <= 12; i++) {
            const ep = document.getElementById('sp_p' + i);
            const ef = document.getElementById('sp_f' + i);
            if (ep) ep.classList.remove('p1', 'p2');
            if (ef) ef.classList.remove('p1', 'p2');
        }
        for (let i = 1; i <= Math.min(gs.score[1], 12); i++) {
            const e = document.getElementById('sp_p' + i); if (e) e.classList.add('p1');
        }
        for (let i = 1; i <= Math.min(gs.score[2], 12); i++) {
            const e = document.getElementById('sp_f' + i); if (e) e.classList.add('p2');
        }
    }

    // ── Soul jars ──

    buildSoulJars() {
        ['soulJars', 'oppSoulJars'].forEach((jid, pi) => {
            const j = document.getElementById(jid);
            if (!j) return;
            j.innerHTML = '';
            FACTIONS.filter(f => f.id !== 'neutral').forEach(f => {
                const pid = pi === 0 ? '' : 'opp_';
                j.innerHTML += `<div class="sj-row"><span class="sj-lbl" style="color:${f.color}">${f.icon}</span><span class="sj-num" id="sjn_${pid}${f.id}" style="color:${f.color};font-family:'Cinzel',serif;font-size:.9rem;font-weight:bold;min-width:20px;text-align:right;">0</span></div>`;
            });
        });
    }

    updateSoulJars() {
        const gs = this.game.gs;
        FACTIONS.filter(f => f.id !== 'neutral').forEach(f => {
            const p1 = document.getElementById(`sjn_${f.id}`);
            const p2 = document.getElementById(`sjn_opp_${f.id}`);
            if (p1) p1.textContent = gs.souls[1][f.id] || 0;
            if (p2) p2.textContent = gs.souls[2][f.id] || 0;
        });
    }

    // ── Field slots ──

    buildFieldSlots(id, player) {
        const row = document.getElementById(id); row.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const s = document.createElement('div');
            s.className = 'card-slot'; s.id = `slot_${player}_${i}`;
            s.innerHTML = `<span class="slot-num">${i + 1}</span>`;
            s.onclick = () => this.game.onSlotClick(player, i);
            row.appendChild(s);
        }
    }

    renderField() {
        const gs = this.game.gs;
        const tt = app.tooltip;
        [1, 2].forEach(p => {
            for (let i = 0; i < 5; i++) {
                const slot = document.getElementById(`slot_${p}_${i}`);
                if (!slot) continue;
                const card = gs.field[p][i];
                if (card) {
                    if (card.isRift) {
                        slot.innerHTML = this.riftCardHtml(card, ' rift-field');
                        const rc = slot.querySelector('.rift-card');
                        if (rc) { rc.addEventListener('mouseenter', e => tt.showRiftTooltip(card, e)); rc.addEventListener('mouseleave', () => tt.hideTooltip()); }
                        slot.onclick = () => { if (p === 1) this.game.onFieldCardClick(p, i); };
                    } else {
                        slot.innerHTML = this.fieldCardHtml(card, p, i);
                        slot.onclick = () => this.game.onFieldCardClick(p, i);
                    }
                    slot.classList.remove('valid');
                } else {
                    slot.innerHTML = `<span class="slot-num">${i + 1}</span>`;
                    slot.onclick = () => this.game.onSlotClick(p, i);
                    slot.classList.toggle('valid', p === 1 && gs.selectedHandIdx !== null && gs.active === 1);
                }
            }
        });
    }

    renderHand() {
        const gs = this.game.gs;
        const tt = app.tooltip;
        const h = document.getElementById('playerHand'); h.innerHTML = '';
        gs.hand[1].forEach((c, i) => {
            if (c.isRift) {
                const w = document.createElement('div');
                w.style.cssText = 'position:relative;cursor:pointer;';
                w.innerHTML = this.riftCardHtml(c);
                const rc = w.querySelector('.rift-card');
                if (gs.selectedHandIdx === i) rc.classList.add('sel-card');
                rc.dataset.hidx = i;
                rc.addEventListener('mouseenter', e => tt.showRiftTooltip(c, e));
                rc.addEventListener('mouseleave', () => tt.hideTooltip());
                rc.onclick = () => this.game.selectHandCard(i);
                h.appendChild(w);
            } else {
                h.innerHTML += this.handCardHtml(c, i);
            }
        });
        document.getElementById('handCount').textContent = gs.hand[1].length;
        h.querySelectorAll('.card').forEach(el => { el.onclick = () => this.game.selectHandCard(+el.dataset.hidx); });
        const o = document.getElementById('oppHandDisplay'); o.innerHTML = '';
        gs.hand[2].forEach(() => { o.innerHTML += `<div class="card-back-mini">✦</div>`; });
    }

    // ── Phase pips ──

    buildPhasePips() {
        const row = document.getElementById('phasePips');
        if (!row) return;
        row.innerHTML = '';
        PHASES.forEach((ph, i) => {
            const pip = document.createElement('div');
            pip.className = 'phase-pip'; pip.id = 'ppip_' + i; pip.title = ph.label;
            row.appendChild(pip);
        });
    }

    updatePhaseUI() {
        const gs = this.game.gs;
        if (!gs) return;  // game was stopped
        const idx = gs.phaseIdx || 0;
        PHASES.forEach((ph, i) => {
            const pip = document.getElementById('ppip_' + i);
            if (!pip) return;
            pip.classList.remove('done', 'active');
            if (i < idx) pip.classList.add('done');
            if (i === idx) pip.classList.add('active');
        });
        const lbl = document.getElementById('phaseCurLbl');
        const btn = document.getElementById('phaseNextBtn');
        const btnLbl = document.getElementById('phaseNextLabel');
        if (!lbl || !btn) return;
        if (gs.active === 2) { lbl.textContent = "Adversary's Turn"; btn.disabled = true; return; }
        btn.disabled = false;
        const cur = PHASES[idx];
        lbl.textContent = cur ? cur.label : '';
        btnLbl.textContent = idx >= PHASES.length - 1 ? 'End Turn ✦' : 'Next Phase →';
    }

    /** Update the sacrifice button visibility */
    updateSacBtn() {
        const gs = this.game.gs;
        document.getElementById('sacrificeBtn').style.display = (gs.selectedHandIdx !== null && gs.hasRolled) ? 'inline-block' : 'none';
    }

    /** Add game log entry */
    addLog(msg, type = '') {
        const log = document.getElementById('gameLog');
        const e = document.createElement('div');
        e.className = 'log-e' + (type ? ' ' + type : '');
        e.textContent = msg;
        log.prepend(e);
        while (log.children.length > 6) log.removeChild(log.lastChild);
    }

    /** Full UI refresh */
    updateUI() {
        const gs = this.game.gs;
        if (!gs) return;  // game was stopped
        document.getElementById('p1Score').textContent = gs.score[1];
        document.getElementById('p2Score').textContent = gs.score[2];
        this.updateScoreTrack(); this.updateSoulJars(); this.renderField(); this.renderHand();
        document.getElementById('deckCount').textContent = gs.deck[1].length;
        document.getElementById('voidCount').textContent = gs.void[1].length;
        const oppDkEl = document.getElementById('oppDeckCount'); if (oppDkEl) oppDkEl.textContent = gs.deck[2].length;
        const oppVdEl = document.getElementById('oppVoidCount'); if (oppVdEl) oppVdEl.textContent = gs.void[2].length;
        const curPhase = PHASES[gs.phaseIdx] || PHASES[0];
        document.getElementById('phaseName').textContent = gs.active === 2 ? "Adversary's Turn" : curPhase.label;
        document.getElementById('turnLabel').textContent = 'Turn ' + gs.turn + ' — ' + (gs.active === 1 ? 'Your Turn' : 'Adversary');
        this.updatePhaseUI();
        this.updateSacBtn();
    }
}

// ═══════════════════════════════════════════════════════════════════
//  DICE MANAGER — roll modal, dice animation, soul collection
// ═══════════════════════════════════════════════════════════════════

class DiceManager {
    constructor(game) {
        this.game = game;
    }

    /** Open the player roll modal and reset dice state */
    openDice() {
        const gs = this.game.gs;
        gs.rollCount = 0; gs.dice = []; gs.selDice = []; gs.bonusDice = [];
        this._renderRollModal();
        document.getElementById('rollModal').classList.add('show');
    }

    /** First roll: 6 random soul dice */
    rollDice() {
        const gs = this.game.gs;
        gs.dice = Array.from({ length: 6 }, () => SOUL_TYPES[Math.floor(Math.random() * SOUL_TYPES.length)]);
        gs.selDice = []; gs.bonusDice = []; gs.rollCount = 1;
        this._applyBonusDice(gs.dice, gs.bonusDice);
        this._animateDiceRoll('rollDiceDisplay', gs.dice, gs.selDice, gs.bonusDice, true, () => {
            document.getElementById('rollBtn').style.display = 'none';
            document.getElementById('rerollBtn').style.display = 'inline-block';
            document.getElementById('collectBtn').style.display = 'inline-block';
            document.getElementById('rollHint').textContent = 'Click dice to KEEP · Reroll the rest once · then Collect';
        });
    }

    /** Reroll un-kept dice (one reroll allowed) */
    rerollDice() {
        const gs = this.game.gs;
        if (gs.rollCount >= 2) { app.ui.addLog('Only one reroll allowed.', 'dmg'); return; }
        gs.dice = gs.dice.map((val, i) => gs.selDice.includes(i) ? val : SOUL_TYPES[Math.floor(Math.random() * SOUL_TYPES.length)]);
        gs.rollCount = 2;
        this._applyBonusDice(gs.dice, gs.bonusDice);
        this._animateDiceRoll('rollDiceDisplay', gs.dice, gs.selDice, gs.bonusDice, false, () => {
            document.getElementById('rerollBtn').style.display = 'none';
            document.getElementById('rollHint').textContent = 'Final roll — Collect to add souls to your jar.';
        });
    }

    /** Collect all dice results into player soul jar */
    collectDice() {
        const gs = this.game.gs;
        const c = {};
        gs.dice.forEach(d => c[d] = (c[d] || 0) + 1);
        for (const [t, v] of Object.entries(c)) {
            gs.souls[1][t] = Math.min(SOUL_CAP, (gs.souls[1][t] || 0) + v);
        }
        app.ui.addLog('Souls collected: ' + Object.entries(c).map(([t, v]) => `+${v} ${t}`).join(', '), 'gain');
        document.getElementById('rollModal').classList.remove('show');
        gs.hasRolled = true; gs.dice = []; gs.selDice = [];
        app.ui.updateUI();
    }

    /** Show the bot roll modal with animated dice */
    animBotRoll(finalDice, gained) {
        return new Promise(resolve => {
            const modal = document.getElementById('botRollModal');
            const res = document.getElementById('botRollResult');
            res.textContent = '';
            document.getElementById('botRollSub').textContent = 'The adversary gathers dark souls…';
            modal.classList.add('show');
            this._animateDiceRoll('botRollDiceDisplay', finalDice, [], [], false, () => {
                res.textContent = Object.entries(gained).map(([t, v]) => `+${v} ${t}`).join('  ·  ') || 'Nothing gained this roll.';
                setTimeout(() => { modal.classList.remove('show'); resolve(); }, 1400);
            });
        });
    }

    // ── Internal helpers ──

    /** Render/refresh the player roll modal UI (no animation) */
    _renderRollModal() {
        const gs = this.game.gs;
        const disp = document.getElementById('rollDiceDisplay'); disp.innerHTML = '';
        const btn = document.getElementById('rollBtn');
        const rBtn = document.getElementById('rerollBtn');
        const cBtn = document.getElementById('collectBtn');
        const hint = document.getElementById('rollHint');
        if (btn) btn.style.display = gs.rollCount === 0 ? 'inline-block' : 'none';
        if (rBtn) rBtn.style.display = gs.rollCount === 1 ? 'inline-block' : 'none';
        if (cBtn) cBtn.style.display = gs.rollCount >= 1 ? 'inline-block' : 'none';
        if (hint) hint.textContent = '';
        if (gs.rollCount === 0) return;
        this._buildDiceEls(disp, gs.dice, gs.selDice, gs.bonusDice, true);
    }

    /** Check for triples/sextuples and push bonus dice */
    _applyBonusDice(dice, bonusDice) {
        const c = {};
        dice.slice(0, 6).forEach(d => c[d] = (c[d] || 0) + 1);
        for (const [t, n] of Object.entries(c)) {
            if (n >= 6) {
                const already = bonusDice.filter(b => b === t).length;
                const need = 2 - already;
                if (need > 0) { for (let j = 0; j < need; j++) { dice.push(t); bonusDice.push(t); } app.ui.addLog(`Six ${t}! +2 bonus dice!`, 'gain'); }
            } else if (n >= 3) {
                if (bonusDice.filter(b => b === t).length === 0) { dice.push(t); bonusDice.push(t); app.ui.addLog(`Triple ${t}! +1 bonus die!`, 'gain'); }
            }
        }
    }

    /** Animate dice spinning then landing */
    _animateDiceRoll(containerId, finalDice, selDice, bonusDice, clickable, onDone) {
        const disp = document.getElementById(containerId);
        disp.innerHTML = '';
        const TICKS = 22;
        const els = [];

        finalDice.forEach((type, i) => {
            const el = document.createElement('div');
            const isKept = selDice.includes(i);
            const isBonus = i >= 6;
            const f = FACTIONS.find(x => x.id === type) || FACTIONS[0];
            if (isKept) {
                el.className = 'roll-die kept' + (isBonus ? ' bonus-die' : '');
                el.style.color = f.color; el.style.boxShadow = '0 0 14px ' + f.color;
                el.style.transform = 'translateY(-5px)'; el.style.borderColor = f.color;
                el.textContent = f.icon; el.title = 'Kept — ' + type;
            } else {
                const rf = FACTIONS[Math.floor(Math.random() * FACTIONS.length)];
                el.className = 'roll-die rolling' + (isBonus ? ' bonus-die' : '');
                el.style.color = rf.color; el.textContent = rf.icon;
            }
            disp.appendChild(el); els.push(el);
        });

        const spinningIdx = finalDice.map((_, i) => i).filter(i => !selDice.includes(i));
        if (spinningIdx.length === 0) { setTimeout(onDone, 200); return; }

        let tick = 0;
        const spinInterval = setInterval(() => {
            tick++;
            spinningIdx.forEach(i => {
                if (tick < TICKS * 0.6 || Math.random() > 0.45) {
                    const rf = FACTIONS[Math.floor(Math.random() * FACTIONS.length)];
                    els[i].style.color = rf.color; els[i].textContent = rf.icon;
                }
            });
            if (tick >= TICKS) {
                clearInterval(spinInterval);
                spinningIdx.forEach((i, order) => {
                    setTimeout(() => {
                        const f = FACTIONS.find(x => x.id === finalDice[i]) || FACTIONS[0];
                        const el = els[i];
                        el.classList.remove('rolling'); el.classList.add('landing');
                        el.style.color = f.color; el.style.borderColor = f.color + '88'; el.textContent = f.icon;
                        if (clickable) {
                            el.style.cursor = 'pointer'; el.title = 'Click to keep';
                            el.onclick = () => {
                                if (selDice.includes(i)) {
                                    selDice.splice(selDice.indexOf(i), 1);
                                    el.classList.remove('kept'); el.style.boxShadow = ''; el.style.transform = ''; el.style.borderColor = f.color + '88'; el.title = 'Click to keep';
                                } else {
                                    selDice.push(i);
                                    el.classList.add('kept'); el.style.boxShadow = '0 0 14px ' + f.color; el.style.transform = 'translateY(-5px)'; el.style.borderColor = f.color; el.title = 'Kept';
                                }
                            };
                        }
                    }, order * 70);
                });
                setTimeout(onDone, spinningIdx.length * 70 + 350);
            }
        }, 70);
    }

    /** Build static dice elements (for re-render without animation) */
    _buildDiceEls(container, dice, selDice, bonusDice, clickable) {
        dice.forEach((type, i) => {
            const f = FACTIONS.find(x => x.id === type) || FACTIONS[0];
            const el = document.createElement('div');
            const kept = selDice.includes(i);
            el.className = 'roll-die' + (kept ? ' kept' : '') + (i >= 6 ? ' bonus-die' : '');
            el.style.color = f.color; el.style.borderColor = kept ? f.color : f.color + '44';
            el.style.boxShadow = kept ? '0 0 14px ' + f.color : '';
            el.style.transform = kept ? 'translateY(-5px)' : '';
            el.textContent = f.icon;
            if (clickable && i < 6) {
                el.style.cursor = 'pointer';
                el.onclick = () => { if (selDice.includes(i)) selDice.splice(selDice.indexOf(i), 1); else selDice.push(i); this._renderRollModal(); };
            }
            container.appendChild(el);
        });
    }
}

// ═══════════════════════════════════════════════════════════════════
//  GAME — core controller: state, phases, combat, cards, immortals
// ═══════════════════════════════════════════════════════════════════

class Game {
    constructor() {
        this.gs = null;                // game state (set by freshState)
        this.chosenImmortal = null;    // player's selected immortal
        this.chosenDeckId = null;      // saved deck id or null for auto
        this.initiativeWinner = 1;     // who goes first
        this._aborted = false;         // set true when leaving game to stop all async chains
    }

    /** Stop the game completely — cancels all running async phases, hides overlays */
    stopGame() {
        this._aborted = true;
        this.gs = null;

        // Hide all game-related overlays and modals
        const overlayIds = [
            'winOverlay', 'atkOverlay', 'placeOverlay', 'initiativeOverlay',
            'drawHandOverlay', 'voidModal', 'rollModal', 'botRollModal',
            'deckPreviewModal'
        ];
        overlayIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('show');
        });

        // Hide tooltip
        const tt = document.getElementById('tooltip');
        if (tt) tt.classList.remove('show');

        // Remove any lingering animation elements
        const drawAnim = document.getElementById('drawCardAnim');
        if (drawAnim) drawAnim.innerHTML = '';

        // Hide phase announce
        const pa = document.getElementById('phaseAnnounce');
        if (pa) pa.classList.remove('playing');

        // Hide dice panel
        const dp = document.getElementById('dicePanel');
        if (dp) dp.classList.remove('show');
    }

    // ── State factory ──

    /** Create a fresh game state object */
    freshState() {
        return {
            phase: 'start', phaseIdx: 0, turn: 1, active: 1, skipFirstDraw: true,
            score: { 1: 0, 2: 0 }, winTarget: 25,
            souls: {
                1: { pure: 0, tainted: 0, divine: 0, infernal: 0, beast: 0, cursed: 0, neutral: 0 },
                2: { pure: 0, tainted: 0, divine: 0, infernal: 0, beast: 0, cursed: 0, neutral: 0 }
            },
            hand: { 1: [], 2: [] },
            field: { 1: [null, null, null, null, null], 2: [null, null, null, null, null] },
            deck: { 1: [], 2: [] }, void: { 1: [], 2: [] },
            playerFactions: [], immortal: null, aiImmortal: null,
            selectedHandIdx: null, atkIdx: null, atkCard: null,
            immortalUsed: { 1: false, 2: false },
            dice: [], selDice: [], bonusDice: [], rollCount: 0,
            hasRolled: false, pendingPlaceSlot: null,
        };
    }

    // ── Card factory helpers ──

    /** Create a playable card instance from base data */
    mk(b) {
        const rar = b.rarity || 'bronze';
        return { ...b, rarity: rar, curAtk: b.atk, curDef: b.def, summoned: false, mode: 'attack', diedOnce: false, sealed: false };
    }

    /** Create a playable rift card instance */
    mkRift(b) {
        return { ...b, curAtk: 0, curDef: 0, summoned: false, mode: 'attack', diedOnce: false, sealed: false, riftRoundsLeft: b.timerRounds || 5, isRift: true };
    }

    /** Shuffle an array in-place (Fisher-Yates) */
    shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } }

    /** Build a deck for given factions (2x each faction card + 2x neutrals + 1 rift) */
    buildPlayerDeck(factions, riftId) {
        let d = [];
        factions.forEach(fid => FACTION_CARDS.filter(c => c.type === fid).forEach(c => { d.push(this.mk(c)); d.push(this.mk(c)); }));
        NEUTRALS.forEach(c => { d.push(this.mk(c)); d.push(this.mk(c)); });
        const riftBase = riftId ? (RIFTS.find(r => r.id === riftId) || RIFTS[0]) : RIFTS[Math.floor(Math.random() * RIFTS.length)];
        if (riftBase) d.push(this.mkRift(riftBase));
        return d;
    }

    /** Draw a card from deck to hand for player p */
    drawCard(p) {
        if (!this.gs.deck[p].length) { if (p === 1) app.ui.addLog('Deck is empty!', 'dmg'); return; }
        if (this.gs.hand[p].length >= 8) { if (p === 1) app.ui.addLog('Hand is full (8 cards)!', 'dmg'); return; }
        this.gs.hand[p].push(this.gs.deck[p].pop());
    }

    /** Animated draw for player with card flying from deck to hand */
    animatedDrawCard() {
        if (!this.gs.deck[1].length || this.gs.hand[1].length >= 8) { app.ui.updateUI(); return Promise.resolve(); }
        return new Promise(resolve => {
            const card = this.gs.deck[1][this.gs.deck[1].length - 1];
            const fac = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
            const deckEl = document.querySelector('.deck-block');
            const handEl = document.getElementById('playerHand');
            const animEl = document.getElementById('drawCardAnim');
            if (!deckEl || !handEl || !animEl) { this.drawCard(1); app.ui.updateUI(); return resolve(); }
            const deckRect = deckEl.getBoundingClientRect();
            const handRect = handEl.getBoundingClientRect();
            animEl.innerHTML = `<span style="font-size:1.4rem">${card.art || '🃏'}</span>`;
            animEl.style.borderColor = fac.color;
            animEl.style.boxShadow = `0 0 18px ${fac.color}88`;
            animEl.style.background = 'var(--stone)';
            animEl.style.opacity = '0';
            animEl.style.transition = 'none';
            animEl.classList.remove('flying', 'done');
            animEl.style.left = (deckRect.left + deckRect.width / 2 - 27) + 'px';
            animEl.style.top = (deckRect.top + deckRect.height / 2 - 39) + 'px';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    animEl.style.opacity = '1';
                    animEl.classList.add('flying');
                    animEl.style.left = (handRect.right - 70) + 'px';
                    animEl.style.top = (handRect.top + handRect.height / 2 - 39) + 'px';
                    setTimeout(() => {
                        this.drawCard(1); app.ui.updateUI();
                        animEl.classList.remove('flying'); animEl.classList.add('done'); animEl.style.opacity = '0';
                        setTimeout(() => { animEl.classList.remove('done'); resolve(); }, 180);
                    }, 460);
                });
            });
        });
    }

    // ── Soul spending ──

    /** Get available soul amounts for paying a card's cost */
    soulSpendOrder(card, soulJar, asEntries = false) {
        const types = (!card.type || card.type === 'neutral') ? SOUL_TYPES : [card.type];
        if (asEntries) return types.map(t => [t, soulJar[t] || 0]);
        return types.map(t => soulJar[t] || 0);
    }

    /** Get total usable souls for an immortal activation */
    immortalSoulsAvailable(im, soulJar) {
        return (im.factions || []).reduce((sum, f) => sum + (soulJar[f] || 0), 0);
    }

    /** Spend souls from jar for an immortal activation */
    immortalSpendSouls(im, soulJar, amount) {
        let left = amount;
        for (const f of im.factions) {
            const take = Math.min(left, soulJar[f] || 0);
            soulJar[f] -= take; left -= take;
            if (left <= 0) break;
        }
    }

    // ── Hand / field interactions ──

    /** Select a card in the player's hand */
    selectHandCard(idx) {
        const gs = this.gs;
        if (gs.active !== 1 || gs.phase === 'ai') return;
        if (gs.phase !== 'placement') {
            app.ui.addLog(`Cards can only be placed during Placement Phase (now: ${PHASES.find(p => p.id === gs.phase)?.label || gs.phase}).`, 'dmg');
            return;
        }
        gs.selectedHandIdx = gs.selectedHandIdx === idx ? null : idx;
        if (gs.selectedHandIdx !== null) app.ui.addLog(`Selected: ${gs.hand[1][idx].name} (cost ${gs.hand[1][idx].cost})`);
        gs.atkIdx = null; gs.atkCard = null;
        app.ui.renderHand(); app.ui.renderField(); app.ui.updateSacBtn();
    }

    /** Handle clicking an empty field slot to place a card */
    onSlotClick(player, idx) {
        const gs = this.gs;
        if (gs.active !== 1 || player !== 1) return;
        if (gs.selectedHandIdx === null) return;
        const card = gs.hand[1][gs.selectedHandIdx];
        if (gs.field[1][idx]) { app.ui.addLog('Slot occupied.', 'dmg'); return; }
        const availableSouls = this.soulSpendOrder(card, gs.souls[1]);
        const canAfford = availableSouls.reduce((a, b) => a + b, 0) >= card.cost;
        if (!canAfford) {
            const total = Object.values(gs.souls[1]).reduce((a, b) => a + b, 0);
            app.ui.addLog(`Need ${card.cost} souls — have ${availableSouls.reduce((a, b) => a + b, 0)} usable (${total} total).`, 'dmg');
            return;
        }
        gs.pendingPlaceSlot = idx;
        document.getElementById('placeCardName').textContent = card.name;
        document.getElementById('placeOverlay').classList.add('show');
    }

    /** Confirm card placement in attack or defense mode */
    confirmPlace(mode) {
        document.getElementById('placeOverlay').classList.remove('show');
        const gs = this.gs;
        const idx = gs.pendingPlaceSlot; gs.pendingPlaceSlot = null;
        if (idx === null || gs.selectedHandIdx === null) return;
        const card = gs.hand[1][gs.selectedHandIdx];
        // Spend souls
        let spent = 0;
        const spendOrder = this.soulSpendOrder(card, gs.souls[1], true);
        for (const [type, amount] of spendOrder) {
            let take = Math.min(amount, card.cost - spent);
            gs.souls[1][type] -= take; spent += take;
            if (spent >= card.cost) break;
        }
        if (card.isRift) {
            let totalAtk = 0, totalDef = 0;
            gs.field[1].forEach((c, fi) => { if (c && fi !== idx) { totalAtk += c.curAtk; totalDef += c.curDef; gs.void[1].push(c); gs.field[1][fi] = null; } });
            const placed = { ...card, curAtk: totalAtk, curDef: totalDef, summoned: true, mode: 'attack', riftRoundsLeft: card.timerRounds || 5 };
            gs.field[1][idx] = placed; gs.hand[1].splice(gs.selectedHandIdx, 1); gs.selectedHandIdx = null;
            app.ui.addLog(`${placed.name} rises! Absorbed ${totalAtk} ATK / ${totalDef} DEF from your creatures.`, 'imp');
            app.anim.animSummon(document.getElementById('slot_1_' + idx), placed);
        } else {
            const placed = { ...card, curAtk: card.atk, curDef: card.def, summoned: true, mode };
            gs.field[1][idx] = placed; gs.hand[1].splice(gs.selectedHandIdx, 1); gs.selectedHandIdx = null;
            app.ui.addLog(`Summoned ${placed.name} in ${mode === 'defense' ? 'Defence' : 'Attack'} mode.`, 'gain');
            app.anim.animSummon(document.getElementById('slot_1_' + idx), placed);
            this.applyOnSummon(placed, 1);
        }
        app.ui.updateUI();
    }

    cancelPlace() { document.getElementById('placeOverlay').classList.remove('show'); this.gs.pendingPlaceSlot = null; }

    /** Apply on-summon abilities */
    applyOnSummon(card, player) {
        const gs = this.gs;
        if (card.ability === 'Curse') gs.field[2].forEach((c, i) => { if (c) gs.field[2][i].curAtk = Math.max(0, c.curAtk - 1); });
        if (card.ability === 'Rally') gs.field[1].forEach((c, i) => { if (c && c.type === 'beast') gs.field[1][i].curAtk++; });
        if (card.ability === 'Foresight') this.animatedDrawCard();
        if (card.ability === 'Inferno') gs.field[2].forEach((c, i) => { if (c) gs.field[2][i].curDef--; });
        if (card.ability === 'Inscribe') this.animatedDrawCard();
        if (card.ability === 'Volley') { const ri = gs.field[2].findIndex(c => c); if (ri >= 0) { gs.field[2][ri].curDef--; if (gs.field[2][ri].curDef <= 0) this.killCard(2, ri, null, true); app.ui.addLog(`${card.name} Volley: 1 dmg to ${gs.field[2][ri]?.name || 'enemy'}!`); } }
        if (card.ability === 'Bless') gs.field[player].forEach((c, i) => { if (c) gs.field[player][i].sealed = false; });
        if (card.ability === 'Drift') { const rt = SOUL_TYPES[Math.floor(Math.random() * SOUL_TYPES.length)]; gs.souls[1][rt] = Math.min(SOUL_CAP, (gs.souls[1][rt] || 0) + 1); app.ui.addLog(`Wandering Soul drifts: +1 ${rt} soul!`, 'gain'); }
    }

    // ── Field card interactions ──

    onFieldCardClick(player, idx) {
        const gs = this.gs;
        if (gs.active !== 1 || gs.phase === 'ai') return;
        if (player === 1) {
            const card = gs.field[1][idx]; if (!card) return;
            if (!gs.hasRolled) { app.ui.addLog('Roll your soul dice first!', 'dmg'); return; }
            this.showCardContext(card, idx);
        } else if (gs.atkCard) {
            this.closeAtkOverlay(); this.doAttack(gs.atkIdx, idx);
        }
    }

    showCardContext(card, idx) {
        const gs = this.gs;
        const ov = document.getElementById('atkOverlay');
        document.getElementById('atkTitle').textContent = `${card.art} ${card.name}`;
        document.getElementById('atkMsg').textContent = `ATK ${card.curAtk} · DEF ${card.curDef} · Mode: ${card.mode === 'attack' ? 'Attack' : 'Defence'}`;
        const tgts = document.getElementById('atkTgts'); tgts.innerHTML = '';
        if (card.mode === 'attack' && !(card.summoned && card.ability !== 'Dash') && !card.sealed) {
            const ab = document.createElement('button'); ab.className = 'btn btn-sm btn-red'; ab.textContent = '⚔️ Declare Attack';
            ab.onclick = () => { this.closeAtkOverlay(); gs.atkIdx = idx; gs.atkCard = card; this.showAtkOverlay(card); };
            tgts.appendChild(ab);
        }
        if (!card.summoned) {
            const sb = document.createElement('button'); sb.className = 'btn btn-sm btn-blue';
            sb.textContent = card.mode === 'attack' ? '🛡 Switch to Defence' : '⚔️ Switch to Attack';
            sb.onclick = () => { this.closeAtkOverlay(); this.switchMode(1, idx); };
            tgts.appendChild(sb);
        } else {
            const nb = document.createElement('div'); nb.style.cssText = 'font-family:Cinzel,serif;font-size:.55rem;color:var(--dim);font-style:italic;'; nb.textContent = 'Cannot switch mode — just summoned.'; tgts.appendChild(nb);
        }
        if (card.sealed) { const sl = document.createElement('div'); sl.style.cssText = 'color:#e07070;font-size:.6rem;font-style:italic;'; sl.textContent = '🔒 This card is sealed.'; tgts.appendChild(sl); }
        ov.classList.add('show');
    }

    switchMode(player, idx) {
        const card = this.gs.field[player][idx]; if (!card) return;
        this.gs.field[player][idx].mode = card.mode === 'attack' ? 'defense' : 'attack';
        app.ui.addLog(`${card.name} → ${this.gs.field[player][idx].mode === 'defense' ? 'Defence' : 'Attack'} mode.`);
        app.ui.updateUI();
    }

    // ── Attack system ──

    showAtkOverlay(card) {
        const gs = this.gs;
        const ov = document.getElementById('atkOverlay');
        document.getElementById('atkTitle').textContent = 'Declare Attack';
        document.getElementById('atkMsg').textContent = `${card.name} (ATK ${card.curAtk}) readies to strike.`;
        const tgts = document.getElementById('atkTgts'); tgts.innerHTML = '';
        const hasAggro = gs.field[2].some(c => c && c.ability === 'Aggravate');
        gs.field[2].forEach((c, i) => {
            if (!c || c.sealed) return;
            if (hasAggro && c.ability !== 'Aggravate') return;
            const f = FACTIONS.find(x => x.id === c.type) || FACTIONS[6];
            const btn = document.createElement('button'); btn.className = 'btn btn-sm'; btn.style.cssText = `border-color:${f.color};color:${f.color}`;
            btn.textContent = `${c.art} ${c.name} 🛡${c.curDef}`;
            btn.onclick = () => { this.closeAtkOverlay(); this.doAttack(gs.atkIdx, i); };
            tgts.appendChild(btn);
        });
        const noEnemies = gs.field[2].every(c => !c);
        if (noEnemies || card.ability === 'Eternal' || card.ability === 'Phaseshift') {
            const btn = document.createElement('button'); btn.className = 'btn btn-sm'; btn.style.cssText = 'border-color:var(--gold);color:var(--gold)';
            btn.textContent = '💀 Strike Player Directly';
            btn.onclick = () => { this.closeAtkOverlay(); this.directAttack(); };
            tgts.appendChild(btn);
        }
        ov.classList.add('show');
    }

    closeAtkOverlay() { document.getElementById('atkOverlay').classList.remove('show'); }
    cancelAtk() { this.closeAtkOverlay(); this.gs.atkIdx = null; this.gs.atkCard = null; app.ui.renderField(); }

    /** Resolve an attack from player field slot to enemy field slot */
    doAttack(atkSlot, defSlot) {
        const gs = this.gs;
        const atk = gs.field[1][atkSlot], def = gs.field[2][defSlot];
        if (!atk || !def) return;
        let dmg = atk.curAtk;
        if (atk.ability === 'Burn') dmg++;
        if (atk.ability === 'Holy' && (def.type === 'infernal' || def.type === 'tainted')) dmg++;
        if (atk.ability === 'Smite' && def.type === 'tainted') dmg += 2;
        if (atk.ability === 'Charge' && atk.summoned) dmg *= 2;
        if (atk.ability === 'Pounce') dmg += gs.field[1].filter(c => c && c.type === 'beast').length - 1;
        if (atk.ability === 'Terror' && def.mode === 'defense') dmg++;
        if (atk.ability === 'Brawl' && def.curDef > atk.curDef) dmg++;
        def.curDef -= dmg;
        app.ui.addLog(`${atk.name} strikes ${def.name} for ${dmg}!`, 'dmg');
        app.anim.flashCombat();
        app.anim.animAttack(document.getElementById('slot_1_' + atkSlot), document.getElementById('slot_2_' + defSlot), app.anim.factionColor(atk.type));
        if (def.mode === 'defense') {
            let ctr = def.curAtk;
            if (atk.ability === 'Shield') ctr = Math.max(0, ctr - 1);
            if (atk.ability === 'Reflect') ctr = Math.max(0, ctr - 1);
            if (atk.ability === 'Armour') ctr = Math.max(1, ctr - 1);
            atk.curDef -= ctr; app.ui.addLog(`${def.name} retaliates for ${ctr}!`, 'dmg');
            if (atk.curDef <= 0) this.killCard(1, atkSlot);
        }
        if (def.ability === 'Rot') atk.curAtk = Math.max(0, atk.curAtk - 1);
        if (def.ability === 'Molten') atk.curDef--;
        if (def.curDef <= 0) this.killCard(2, defSlot, atk);
        else if (def.ability === 'Ensnare') { def.ensnared = true; app.ui.addLog(`${def.name}: ${atk.name} is ensnared!`); }
        gs.atkIdx = null; gs.atkCard = null;
        app.ui.updateUI(); this.checkWin();
    }

    /** Direct attack — strike the opponent's score directly */
    directAttack() {
        const gs = this.gs;
        const card = gs.atkCard; if (!card) return;
        let dmg = card.curAtk + (card.ability === 'Burn' ? 1 : 0) + (card.ability === 'Drain' ? 1 : 0);
        gs.score[1] = Math.min(gs.winTarget, gs.score[1] + dmg);
        app.ui.addLog(`${card.name} strikes adversary for ${dmg} pts!`, 'gain');
        app.anim.showFloat(`+${dmg}`, 'var(--gold)');
        app.anim.flashCombat();
        app.anim.animDirectHit(document.getElementById('slot_1_' + gs.atkIdx), app.anim.factionColor(card.type));
        gs.atkIdx = null; gs.atkCard = null;
        app.ui.updateUI(); this.checkWin();
    }

    /** Handle a card being destroyed */
    killCard(player, slot, killer = null, silent = false) {
        const gs = this.gs;
        const card = gs.field[player][slot]; if (!card) return;
        // Fredariq Undead Legion
        if (player === 1 && gs._undeadLegion) {
            gs.hand[1].push({ ...card, curAtk: card.atk, curDef: card.def, summoned: false, diedOnce: false });
            gs.void[1].push(card); gs.field[player][slot] = null;
            app.ui.addLog(`${card.name} returns to hand — Undead Legion!`, 'gain'); return;
        }
        // Nymph Soul Tide
        if (player === 2 && killer && gs._soulTide) {
            const st = gs.playerFactions[0] || 'pure';
            gs.souls[1][st] = Math.min(SOUL_CAP, (gs.souls[1][st] || 0) + 1);
            app.ui.addLog(`Soul Tide: +1 ${st} soul!`, 'gain');
        }
        // Eldriana Cleansing Flame
        if (player === 1 && card.type === 'pure' && gs._cleansingFlame) {
            const cfSlot = gs.field[1].findIndex(x => !x);
            const cfCard = gs.deck[1].find(c => c.type === 'infernal' && c.cost <= 3);
            if (cfSlot >= 0 && cfCard) {
                gs.deck[1].splice(gs.deck[1].indexOf(cfCard), 1);
                gs.field[1][cfSlot] = { ...cfCard, curAtk: cfCard.atk, curDef: cfCard.def, summoned: false, mode: 'attack' };
                app.ui.addLog(`Cleansing Flame: ${cfCard.name} summoned from deck!`, 'gain');
            }
        }
        if (card.ability === 'Undying' && !card.diedOnce) { gs.hand[player].push({ ...card, curAtk: card.atk, curDef: card.def, summoned: false, diedOnce: true }); app.ui.addLog(`${card.name} Undying!`, 'gain'); }
        if (card.ability === 'Swarm' && player === 1) { const es = gs.field[1].findIndex(x => !x); if (es >= 0) { const rat = ALL_CARDS.find(x => x.id === 'n09'); if (rat) gs.field[1][es] = this.mk(rat); } }
        if (card.ability === 'Spark' && player === 2) { const ri = gs.field[1].findIndex(c => c); if (ri >= 0) { gs.field[1][ri].curDef -= 2; app.ui.addLog(`${card.name} Spark: deals 2 dmg to ${gs.field[1][ri].name}!`, 'dmg'); } }
        if (player === 2 && killer) {
            if (killer.ability === 'Trample') { const ex = Math.abs(card.curDef); if (ex > 0) { gs.score[1] = Math.min(gs.winTarget, gs.score[1] + ex); app.ui.addLog(`Trample! +${ex} pts!`, 'gain'); } }
            if (killer.ability === 'Reap') { const rf = gs.playerFactions[0]; gs.souls[1][rf] = Math.min(SOUL_CAP, (gs.souls[1][rf] || 0) + 1); app.ui.addLog(`Reap: +1 ${rf} soul!`, 'gain'); }
            if (killer.ability === 'Soul Ferrier' || killer.ability === 'Passage') { gs.souls[1][card.type] = Math.min(SOUL_CAP, (gs.souls[1][card.type] || 0) + 1); }
        }
        if (card.ability === 'Martyr' && player === 1) { const ai2 = gs.field[1].findIndex(c => c && c !== card); if (ai2 >= 0) { gs.field[1][ai2].curDef += 3; app.ui.addLog(`Martyr: +3 DEF to ${gs.field[1][ai2].name}!`, 'gain'); } }
        gs.void[player].push(card); gs.field[player][slot] = null;
        if (!silent) app.ui.addLog(`${card.name} destroyed!`, 'dmg');
        // Death animation on the slot element
        const deathSlot = document.getElementById('slot_' + player + '_' + slot);
        const deathColor = app.anim.factionColor(card.type);
        app.anim.animDeath(deathSlot, deathColor);
        if (player === 2) app.anim.showFloat('⚔ Slain!', 'var(--infernal)');
    }

    // ── Immortal activation (player) ──

    activateImmortal() {
        const gs = this.gs;
        if (gs.active !== 1 || gs.immortalUsed[1]) { app.ui.addLog('Immortal already used this turn.', 'dmg'); return; }
        const im = gs.immortal;
        const avail = this.immortalSoulsAvailable(im, gs.souls[1]);
        if (avail < im.souls) { app.ui.addLog(`Need ${im.souls} ${im.factions.join(' + ')} souls to activate ${im.name} (have ${avail}).`, 'dmg'); return; }
        this.immortalSpendSouls(im, gs.souls[1], im.souls);
        gs.immortalUsed[1] = true;
        document.getElementById('playerImmortal').classList.add('used');
        app.anim.animImmortal(im, im.abilityName);
        this._resolveImmortal(im, 1);
        app.ui.updateUI();
    }

    /** Resolve an immortal ability for the given controller (1=player, 2=AI) */
    _resolveImmortal(im, controller) {
        const gs = this.gs;
        const ally = controller, enemy = controller === 1 ? 2 : 1;
        switch (im.id) {
            case 'im1': gs.field[ally].forEach((c, i) => { if (c) gs.field[ally][i].curDef += 2; }); app.ui.addLog(`${im.name}: all allies +2 DEF!`, 'imp'); break;
            case 'im2': { const es = gs.field[ally].findIndex(x => !x); if (es >= 0) { gs.field[ally][es] = { id: 'wraith', name: 'Wraith', type: 'tainted', atk: 2, def: 2, cost: 0, art: '👻', ability: 'Dash', desc: 'Summoned.', curAtk: 2, curDef: 2, summoned: false, mode: 'attack', diedOnce: false, sealed: false }; app.ui.addLog(`${im.name}: a Wraith rises!`, 'imp'); } break; }
            case 'im3': gs.field[enemy].forEach((c, i) => { if (c) gs.field[enemy][i].curAtk = Math.max(0, c.curAtk - 1); }); app.ui.addLog(`${im.name}: enemies -1 ATK!`, 'imp'); break;
            case 'im4': { const ai = gs.field[ally].findIndex(c => c); if (ai >= 0) { gs.field[ally][ai].curDef += 3; app.ui.addLog(`${im.name}: +3 DEF to ${gs.field[ally][ai].name}!`, 'imp'); } break; }
            case 'im5': { const ei = gs.field[enemy].findIndex(c => c); if (ei >= 0) { gs.field[enemy][ei].sealed = true; app.ui.addLog(`${im.name}: ${gs.field[enemy][ei].name} sealed!`, 'imp'); } break; }
            case 'im6':
                if (controller === 1) { this.animatedDrawCard().then(() => { gs.souls[1].divine = Math.min(SOUL_CAP, (gs.souls[1].divine || 0) + 2); app.ui.addLog(`${im.name}: draw +1, +2 divine souls!`, 'imp'); app.ui.updateUI(); }); }
                else { this.drawCard(2); const fac = im.factions[0] || 'divine'; gs.souls[2][fac] = Math.min(SOUL_CAP, (gs.souls[2][fac] || 0) + 2); app.ui.addLog(`${im.name}: draw +1, +2 ${fac} souls!`, 'imp'); }
                break;
            case 'im7': { const ai2 = gs.field[ally].findIndex(c => c); if (ai2 >= 0) { gs.field[ally][ai2].curAtk += 2; gs.field[ally][ai2].ability = 'Dash'; gs.field[ally][ai2].summoned = false; app.ui.addLog(`${im.name}: ${gs.field[ally][ai2].name} +2 ATK + Dash!`, 'imp'); } break; }
            case 'im8': { const last = gs.void[ally][gs.void[ally].length - 1]; if (last) { const es = gs.field[ally].findIndex(x => !x); if (es >= 0) { gs.field[ally][es] = { ...last, curAtk: last.atk, curDef: 1, summoned: false, mode: 'attack' }; gs.void[ally].pop(); app.ui.addLog(`${im.name}: ${last.name} resurrected!`, 'imp'); } } break; }
            case 'im9': if (controller === 1) gs._undeadLegion = true; app.ui.addLog(`${im.name}: Undead Legion active!`, 'imp'); break;
            case 'im10': gs.field[ally].forEach((c, i) => { if (c) gs.field[ally][i].curDef += 2; }); app.ui.addLog(`${im.name}: Angelic Grace — all allies +2 DEF!`, 'imp'); break;
            case 'im11': if (controller === 1) gs._cleansingFlame = true; app.ui.addLog(`${im.name}: Cleansing Flame active!`, 'imp'); break;
            case 'im12': if (controller === 1) { gs._soulTide = true; gs._soulTideKills = 0; } app.ui.addLog(`${im.name}: Soul Tide active!`, 'imp'); break;
            case 'im13': {
                const targets = gs.field[enemy].filter(Boolean);
                if (targets.length) {
                    const weakest = gs.field[enemy].reduce((best, c, i) => { if (!c) return best; return (!best.c || c.curDef < best.c.curDef) ? { c, i } : best; }, { c: null, i: -1 });
                    if (weakest.i >= 0) { const pts = Math.floor((weakest.c.curAtk + weakest.c.curDef) / 2); gs.score[ally] += pts; gs.void[enemy].push(weakest.c); gs.field[enemy][weakest.i] = null; app.ui.addLog(`${im.name}: Sacrificed ${weakest.c.name} — gained ${pts} points!`, 'imp'); }
                } break;
            }
            case 'im14': {
                const allies = gs.field[ally].filter(Boolean);
                if (allies.length) {
                    const strongest = gs.field[ally].reduce((best, c, i) => (!c ? best : (!best.c || c.curAtk > best.c.curAtk) ? { c, i } : best), { c: null, i: -1 });
                    if (strongest.i >= 0) { gs.field[ally][strongest.i].curAtk += 3; if (controller === 1) gs.field[ally][strongest.i]._dranic3 = true; app.ui.addLog(`${im.name}: ${strongest.c.name} gains +3 ATK!`, 'imp'); }
                } break;
            }
            case 'im15': {
                if (gs.hand[enemy].length) {
                    const ri = Math.floor(Math.random() * gs.hand[enemy].length);
                    const discarded = gs.hand[enemy].splice(ri, 1)[0];
                    gs.void[enemy].push(discarded);
                    app.ui.addLog(`${im.name}: Void Grasp — ${discarded.name} sent to the void!`, 'imp');
                } break;
            }
        }
    }

    // ── Sacrifice ──

    sacrificeCard() {
        const gs = this.gs;
        if (gs.selectedHandIdx === null) return;
        const card = gs.hand[1][gs.selectedHandIdx];
        const back = Math.max(1, Math.floor(card.cost / 2));
        gs.souls[1][card.type] = Math.min(SOUL_CAP, (gs.souls[1][card.type] || 0) + back);
        app.ui.addLog(`Sacrificed ${card.name} for ${back} ${card.type} soul(s).`, 'gain');
        gs.void[1].push(card); gs.hand[1].splice(gs.selectedHandIdx, 1); gs.selectedHandIdx = null;
        app.ui.updateUI(); app.ui.updateSacBtn();
    }

    // ── Void viewer ──

    openVoidModal(player) {
        const gs = this.gs;
        const cards = [...(gs.void[player] || [])].reverse();
        const isOpp = player === 2;
        document.getElementById('voidModalTitle').textContent = isOpp ? `${gs.aiImmortal ? gs.aiImmortal.name : 'Adversary'} — Void` : 'Your Void';
        document.getElementById('voidModalSub').textContent = `${cards.length} card${cards.length !== 1 ? 's' : ''} — most recent first`;
        const body = document.getElementById('voidModalBody'); body.innerHTML = '';
        if (!cards.length) { body.innerHTML = '<div style="width:100%;text-align:center;padding:40px;color:var(--dim);font-family:Cinzel,serif;font-size:.65rem;letter-spacing:2px;">The void is empty</div>'; }
        else {
            cards.forEach((card, i) => {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'position:relative;opacity:' + (1 - i * 0.04).toFixed(2) + ';';
                if (card.isRift) {
                    wrapper.innerHTML = app.ui.riftCardHtml(card);
                    wrapper.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseenter', e => app.tooltip.showRiftTooltip(card, e));
                    wrapper.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseleave', () => app.tooltip.hideTooltip());
                } else {
                    const rar = card.rarity || (card.cost >= 4 ? 'gold' : card.cost >= 3 ? 'silver' : 'bronze');
                    wrapper.innerHTML = app.ui.cardHtml(card, `card card-sm rarity-${rar}`);
                    wrapper.querySelector('.card')?.addEventListener('mouseenter', e => app.tooltip.showTooltip(card, e));
                    wrapper.querySelector('.card')?.addEventListener('mouseleave', () => app.tooltip.hideTooltip());
                }
                const badge = document.createElement('div');
                badge.style.cssText = 'position:absolute;top:-6px;right:-6px;background:var(--bg4);border:1px solid var(--iron2);border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-family:Cinzel,serif;font-size:.42rem;color:var(--dim);z-index:5;';
                badge.textContent = i + 1;
                wrapper.appendChild(badge); body.appendChild(wrapper);
            });
        }
        document.getElementById('voidModal').classList.add('show');
    }

    closeVoidModal() { document.getElementById('voidModal').classList.remove('show'); }

    // ── Phase system ──

    /** Advance to the next phase (player click) */
    async nextPhase() {
        if (this._aborted) return;
        const gs = this.gs;
        if (!gs || gs.active !== 1) return;
        const cur = PHASES[gs.phaseIdx];
        if (cur.id === 'roll' && !gs.hasRolled) { app.ui.addLog('Roll your soul dice first!', 'dmg'); return; }
        if (cur.id === 'end') { await this.doEndTurn(); return; }
        gs.phaseIdx++;
        const next = PHASES[gs.phaseIdx];
        gs.phase = next.id;
        app.ui.updatePhaseUI();
        await app.anim.announcePhase(next.icon + '  ' + next.label.toUpperCase());
        if (next.id === 'draw') {
            if (gs.skipFirstDraw) {
                gs.skipFirstDraw = false;
                app.ui.addLog('Draw phase skipped — opening hand already dealt.', 'imp');
                await sleep(300);
                gs.phaseIdx++; gs.phase = PHASES[gs.phaseIdx].id;
                app.ui.updatePhaseUI();
                await app.anim.announcePhase('🎲  ROLL PHASE');
                app.dice.openDice();
            } else {
                await sleep(200); await this.animatedDrawCard();
                app.ui.addLog('You draw a card.', 'imp');
            }
        }
        if (next.id === 'roll') app.dice.openDice();
        app.ui.updateUI();
    }

    /** End of player turn — cleanup and hand off to AI */
    async doEndTurn() {
        if (this._aborted) return;
        const gs = this.gs;
        if (!gs) return;
        gs.field[1].forEach((c, i) => {
            if (!c) return;
            if (c.summoned && c.ability !== 'Dash') gs.field[1][i].summoned = false;
            if (c.ability === 'Stalwart') gs.field[1][i].curDef++;
            if (c.ability === 'Regenerate') gs.field[1][i].curDef++;
            if (c.ability === 'Ignite') { const ri = gs.field[2].findIndex(x => x); if (ri >= 0) { gs.field[2][ri].curDef--; if (gs.field[2][ri].curDef <= 0) this.killCard(2, ri); } }
            if (c.ensnared) gs.field[1][i].ensnared = false;
        });
        const mender = gs.field[1].find(c => c && c.ability === 'Mend');
        if (mender) { const ai = gs.field[1].findIndex(c => c && c !== mender); if (ai >= 0) gs.field[1][ai].curDef++; }
        gs.field[2].forEach((c, i) => { if (c) { gs.field[2][i].sealed = false; if (c.ability === 'Stalwart') gs.field[2][i].curDef++; } });
        gs.immortalUsed[1] = false; gs._undeadLegion = false; gs._cleansingFlame = false;
        gs._soulTide = false; gs._soulTideKills = 0; gs._devourTarget = null;
        document.getElementById('playerImmortal').classList.remove('used');
        gs.field[1].forEach((c, i) => { if (c && c._dranic3) { gs.field[1][i].curAtk = Math.max(0, c.curAtk - 3); delete gs.field[1][i]._dranic3; } });
        // Rift timers
        gs.field[1].forEach((c, i) => {
            if (c && c.isRift) {
                c.riftRoundsLeft = Math.max(0, (c.riftRoundsLeft || 1) - 1);
                if (c.riftRoundsLeft === 0) { app.ui.addLog(`${c.name} collapses — the rift closes!`, 'dmg'); gs.void[1].push(c); gs.field[1][i] = null; }
                else app.ui.addLog(`${c.name} endures — ${c.riftRoundsLeft} round${c.riftRoundsLeft !== 1 ? 's' : ''} remaining.`);
            }
        });
        app.ui.addLog('Your turn ends.', 'imp');
        gs.active = 2; gs.phase = 'ai'; gs.phaseIdx = 0;
        gs.hasRolled = false; gs.selectedHandIdx = null; gs.atkIdx = null; gs.atkCard = null;
        app.ui.updateUI();
        app.ai.runAI();
    }

    // ── Win check ──

    checkWin() {
        const gs = this.gs;
        if (gs.score[1] >= gs.winTarget) { document.getElementById('winTitle').textContent = 'Reborn!'; document.getElementById('winText').textContent = 'Your soul ascends. The adversary fades into the void.'; document.getElementById('winOverlay').classList.add('show'); return true; }
        if (gs.score[2] >= gs.winTarget) { document.getElementById('winTitle').textContent = 'Banished!'; document.getElementById('winText').textContent = 'The adversary claims victory. Your soul is cast into endless dark.'; document.getElementById('winOverlay').classList.add('show'); return true; }
        return false;
    }

    // ── Game startup ──

    async startGameNow() {
        this._aborted = false;  // reset abort flag for new game
        const gs = this.gs = this.freshState();
        gs.active = this.initiativeWinner;
        if (this.initiativeWinner === 2) gs.phase = 'ai';
        gs.playerFactions = [...this.chosenImmortal.factions, 'neutral'];
        gs.immortal = this.chosenImmortal;

        // Build player deck
        if (this.chosenDeckId) {
            const savedDecks = app.deckBuilder.getSavedDecks();
            const saved = savedDecks.find(d => d.id === this.chosenDeckId);
            if (saved) {
                const allCards = [...FACTION_CARDS, ...NEUTRALS, ...RIFTS.map(r => this.mkRift(r))];
                gs.deck[1] = saved.cardIds.map(cid => { const base = allCards.find(c => c.id === cid); return base ? (base.isRift ? this.mkRift(base) : this.mk(base)) : null; }).filter(Boolean);
            } else gs.deck[1] = this.buildPlayerDeck(this.chosenImmortal.factions);
        } else gs.deck[1] = this.buildPlayerDeck(this.chosenImmortal.factions);

        // AI immortal
        const aiPool = IMMORTALS.filter(im => im.id !== this.chosenImmortal.id);
        const aiIm = aiPool[Math.floor(Math.random() * aiPool.length)];
        gs.aiImmortal = aiIm;
        gs.deck[2] = this.buildPlayerDeck(aiIm.factions);
        this.shuffle(gs.deck[1]); this.shuffle(gs.deck[2]);
        this.chosenImmortal.factions.forEach(f => gs.souls[1][f] = 2);
        aiIm.factions.forEach(f => gs.souls[2][f] = 2);
        for (let i = 0; i < 5; i++) this.drawCard(2);

        app.screen.go('setup-screen', 'game-screen');

        // Player immortal sidebar
        const imEl = document.getElementById('playerImmortal');
        if (gs.immortal.realArt) {
            imEl.innerHTML = app.ui.immortalSidebarHtml(gs.immortal);
            imEl.style.cssText = 'width:90px;background:none;border:none;padding:0;cursor:pointer;transition:all .3s;';
            imEl.onclick = () => this.activateImmortal();
            imEl.addEventListener('mouseenter', e => app.tooltip.showImmortalTooltip(gs.immortal, e));
            imEl.addEventListener('mouseleave', () => app.tooltip.hideTooltip());
        } else {
            document.getElementById('imArt').textContent = gs.immortal.art;
            document.getElementById('imNameEl').textContent = gs.immortal.name;
            document.getElementById('imFacEl').textContent = gs.immortal.factions.map(f => FACTIONS.find(x => x.id === f)?.name || f).join(' · ');
            document.getElementById('imCostBadge').textContent = gs.immortal.souls;
            document.getElementById('imAblName').textContent = gs.immortal.abilityName;
        }

        // Opponent immortal sidebar
        const oppImEl = document.getElementById('oppImArt');
        if (gs.aiImmortal) {
            if (gs.aiImmortal.realArt) { oppImEl.innerHTML = '<img src="' + UIRenderer.encodeArtPath(gs.aiImmortal.realArt) + '" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:4px;">'; oppImEl.style.cssText = 'width:70px;height:98px;overflow:hidden;border-radius:4px;'; }
            else oppImEl.textContent = gs.aiImmortal.art;
            document.getElementById('oppImName').textContent = gs.aiImmortal.name;
            oppImEl.addEventListener('mouseenter', e => app.tooltip.showImmortalTooltip(gs.aiImmortal, e));
            oppImEl.addEventListener('mouseleave', () => app.tooltip.hideTooltip());
        }

        app.ui.buildScoreTrack(); app.ui.buildSoulJars(); app.ui.buildPhasePips();
        app.ui.buildFieldSlots('playerField', 1); app.ui.buildFieldSlots('oppField', 2);
        app.ui.addLog('The arena stirs. ' + (gs.aiImmortal ? gs.aiImmortal.name : 'Adversary') + ' enters the arena!', 'imp');
        setTimeout(() => app.anim.announcePhase('⚑  START PHASE'), 1200);
        app.ui.updateUI();
        this._addGameTooltips();
        await this._drawOpeningHand();
        gs.skipFirstDraw = true;
        if (this.initiativeWinner === 2) setTimeout(() => app.ai.runAI(), 600);
    }

    async _drawOpeningHand() {
        for (let i = 0; i < 5; i++) { await sleep(120); await this.animatedDrawCard(); }
    }

    /** Attach delegated tooltip listeners to the game screen */
    _addGameTooltips() {
        const gs_screen = document.getElementById('game-screen');
        const tt = app.tooltip;
        gs_screen.addEventListener('mouseover', e => {
            const fc = e.target.closest('[data-cplayer][data-cidx]');
            if (fc) { const p = +fc.dataset.cplayer, i = +fc.dataset.cidx; const c = this.gs.field[p][i]; if (c) tt.showTooltip(c, e); return; }
            const hc = e.target.closest('[data-hidx]');
            if (hc) { const i = +hc.dataset.hidx; const c = this.gs.hand[1][i]; if (c) tt.showTooltip(c, e); return; }
            const ic = e.target.closest('#playerImmortal');
            if (ic && this.gs && this.gs.immortal) { tt.showImmortalTooltip(this.gs.immortal, e); return; }
            const rc = e.target.closest('.rift-card');
            if (rc && this.gs) { for (const p of [1, 2]) for (const c of this.gs.field[p]) if (c && c.isRift) { tt.showRiftTooltip(c, e); return; } }
        });
        gs_screen.addEventListener('mouseout', e => {
            if (!e.relatedTarget || (!e.relatedTarget.closest('[data-cplayer][data-cidx]') && !e.relatedTarget.closest('[data-hidx]'))) tt.hideTooltip();
        });
    }
}

/** Utility: async sleep */
function sleep(ms) { return new Promise(r => setTimeout(r, (app && app.game && app.game._aborted) ? 0 : ms)); }

// ═══════════════════════════════════════════════════════════════════
//  AI CONTROLLER — automated adversary turn
// ═══════════════════════════════════════════════════════════════════

class AIController {
    constructor(game) {
        this.game = game;
    }

    /** Run the full AI turn (draw → roll → immortal → placement → fight → end) */
    async runAI() {
        const game = this.game;
        if (game._aborted) return;  // game was stopped
        const gs = game.gs;
        if (!gs) return;  // no game state
        const aiIm = gs.aiImmortal;
        const aiFactions = aiIm ? [...aiIm.factions, 'neutral'] : ['neutral'];

        /** Check if AI can afford a card */
        const canAfford = (card) => {
            let remaining = card.cost; const tmp = { ...gs.souls[2] };
            for (const f of [...aiFactions, ...SOUL_TYPES]) { if (tmp[f] > 0 && remaining > 0) { const pay = Math.min(tmp[f], remaining); tmp[f] -= pay; remaining -= pay; } }
            return remaining <= 0;
        };
        /** Spend souls from AI jar */
        const payCost = (cost) => {
            let remaining = cost;
            for (const f of [...aiFactions, ...SOUL_TYPES]) { if (gs.souls[2][f] > 0 && remaining > 0) { const pay = Math.min(gs.souls[2][f], remaining); gs.souls[2][f] -= pay; remaining -= pay; } }
        };

        // ── START ──
        if (game._aborted) return;
        gs.phase = 'start'; gs.phaseIdx = 0; app.ui.updateUI();
        await app.anim.announcePhase('⚑  ADVERSARY — START PHASE'); await sleep(400);

        // ── DRAW ──
        if (game._aborted) return;
        gs.phase = 'draw'; gs.phaseIdx = 1; app.ui.updateUI();
        if (gs.skipFirstDraw) { gs.skipFirstDraw = false; app.ui.addLog('Adversary skips draw — opening hand dealt.', 'imp'); await sleep(300); }
        else { await app.anim.announcePhase('🃏  ADVERSARY — DRAW PHASE'); await sleep(300); if (gs.deck[2].length > 0) { game.drawCard(2); app.ui.addLog('Adversary draws a card.'); } else app.ui.addLog('Adversary has no cards left in deck!', 'dmg'); await sleep(500); }

        // ── ROLL ──
        if (game._aborted) return;
        gs.phase = 'roll'; gs.phaseIdx = 2; app.ui.updateUI();
        await app.anim.announcePhase('🎲  ADVERSARY — ROLL PHASE'); await sleep(300);
        const aiFacs = aiFactions.filter(f => f !== 'neutral');
        const soulPool = [...aiFacs, ...aiFacs, ...aiFacs, ...SOUL_TYPES];
        const rolledDice = Array.from({ length: 6 }, () => soulPool[Math.floor(Math.random() * soulPool.length)]);
        const gained = {};
        rolledDice.forEach(d => { gained[d] = (gained[d] || 0) + 1; });
        await app.dice.animBotRoll(rolledDice, gained);
        for (const [t, v] of Object.entries(gained)) { gs.souls[2][t] = Math.min(SOUL_CAP, (gs.souls[2][t] || 0) + v); }
        app.ui.addLog('Adversary gains: ' + (Object.entries(gained).map(([t, v]) => '+' + v + ' ' + t).join(', ') || 'nothing') + '.');
        gs.hasRolled = true; app.ui.updateUI(); await sleep(300);

        // ── IMMORTAL ──
        if (game._aborted) return;
        if (aiIm && !gs.immortalUsed[2]) {
            const aiImAvail = game.immortalSoulsAvailable(aiIm, gs.souls[2]);
            const hasAllies = gs.field[2].some(c => c);
            const hasEnemies = gs.field[1].some(c => c);
            if (aiImAvail >= aiIm.souls && (hasAllies || hasEnemies)) {
                game.immortalSpendSouls(aiIm, gs.souls[2], aiIm.souls);
                gs.immortalUsed[2] = true;
                await app.anim.animImmortal(aiIm, aiIm.abilityName);
                game._resolveImmortal(aiIm, 2);
                app.ui.updateUI(); await sleep(600);
            }
        }

        // ── PLACEMENT ──
        if (game._aborted) return;
        gs.phase = 'placement'; gs.phaseIdx = 3; app.ui.updateUI();
        await app.anim.announcePhase('⚔  ADVERSARY — PLACEMENT PHASE'); await sleep(400);
        const sortedHand = [...gs.hand[2]].sort((a, b) => b.cost - a.cost);
        for (const card of sortedHand) {
            if (!canAfford(card)) continue;
            const es = gs.field[2].findIndex(x => !x);
            if (es < 0) { app.ui.addLog("Adversary's field is full."); break; }
            payCost(card.cost);
            const hi = gs.hand[2].findIndex(c => c.uid === card.uid || c.id === card.id);
            if (hi >= 0) gs.hand[2].splice(hi, 1);
            gs.field[2][es] = { ...card, curAtk: card.atk, curDef: card.def, summoned: true, mode: 'attack' };
            app.ui.addLog('Adversary summons ' + card.name + '!');
            app.ui.updateUI();
            await app.anim.animSummon(document.getElementById('slot_2_' + es), card); await sleep(200);
        }
        await sleep(300);

        // ── FIGHT ──
        if (game._aborted) return;
        gs.phase = 'fight'; gs.phaseIdx = 4; app.ui.updateUI();
        await app.anim.announcePhase('💀  ADVERSARY — FIGHT PHASE'); await sleep(400);
        for (let ai = 0; ai < 5; ai++) {
            const attacker = gs.field[2][ai];
            if (!attacker || attacker.sealed || attacker.mode === 'defense') continue;
            if (attacker.summoned && attacker.ability !== 'Dash') continue;
            const targets = gs.field[1].map((c, i) => c ? i : -1).filter(i => i >= 0);
            if (targets.length) {
                const ti = targets.find(i => gs.field[1][i].ability === 'Aggravate') ?? targets[0];
                const def = gs.field[1][ti];
                let dmg = attacker.curAtk + (attacker.ability === 'Burn' ? 1 : 0) + (attacker.ability === 'Terror' && def.mode === 'defense' ? 1 : 0);
                def.curDef -= dmg;
                app.ui.addLog(attacker.name + ' attacks ' + def.name + ' for ' + dmg + '!', 'dmg');
                app.anim.flashCombat();
                await app.anim.animAttack(document.getElementById('slot_2_' + ai), document.getElementById('slot_1_' + ti), app.anim.factionColor(attacker.type));
                if (def.mode === 'defense') { attacker.curDef -= def.curAtk; if (attacker.curDef <= 0) { gs.void[2].push(attacker); gs.field[2][ai] = null; } }
                if (def.curDef <= 0) game.killCard(1, ti, attacker);
            } else {
                const dmg = attacker.curAtk + (attacker.ability === 'Burn' ? 1 : 0) + (attacker.ability === 'Drain' ? 1 : 0);
                gs.score[2] = Math.min(gs.winTarget, gs.score[2] + dmg);
                app.ui.addLog(attacker.name + ' strikes you for ' + dmg + ' pts!', 'dmg');
                app.anim.flashCombat();
                await app.anim.animDirectHit(document.getElementById('slot_2_' + ai), app.anim.factionColor(attacker.type));
            }
            app.ui.updateUI(); await sleep(200);
            if (game.checkWin()) return;
        }
        await sleep(300);

        // ── END ──
        if (game._aborted) return;
        gs.phase = 'end'; gs.phaseIdx = 5; app.ui.updateUI();
        await app.anim.announcePhase('⏎  ADVERSARY — END PHASE'); await sleep(400);
        gs.field[2].forEach((c, i) => { if (c && c.summoned) gs.field[2][i].summoned = false; });
        gs.field[1].forEach((c, i) => { if (c) { gs.field[1][i].sealed = false; if (c.ability === 'Stalwart') gs.field[1][i].curDef++; } });
        gs.field[2].forEach((c, i) => {
            if (c && c.isRift) {
                c.riftRoundsLeft = Math.max(0, (c.riftRoundsLeft || 1) - 1);
                if (c.riftRoundsLeft === 0) { app.ui.addLog(c.name + ' collapses!', 'dmg'); gs.void[2].push(c); gs.field[2][i] = null; }
                else app.ui.addLog(c.name + ' endures — ' + c.riftRoundsLeft + ' round(s) left.');
            }
        });
        app.ui.addLog("Adversary's turn ends.", 'imp'); await sleep(400);

        // ── Hand back to player ──
        if (game._aborted) return;
        gs.turn++; gs.active = 1; gs.phase = 'start'; gs.phaseIdx = 0;
        gs.hasRolled = false; gs.immortalUsed[1] = false; gs.immortalUsed[2] = false;
        gs._undeadLegion = false; gs._cleansingFlame = false; gs._soulTide = false; gs._soulTideKills = 0;
        app.ui.updateUI();
        await app.anim.announcePhase('⚑  START PHASE');
        app.ui.addLog('Turn ' + gs.turn + ' — your turn!', 'imp');
    }
}

// ═══════════════════════════════════════════════════════════════════
//  CATALOGUE UI — card catalogue browser
// ═══════════════════════════════════════════════════════════════════

class CatalogueUI {
    constructor() {
        this.tab = 'immortal';
        this.facFilter = 'all';
        this.rarFilter = 'all';
    }

    setTab(tab) {
        this.tab = tab; this.facFilter = 'all';
        document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
        const tabEl = document.getElementById('ctab-' + tab); if (tabEl) tabEl.classList.add('active');
        const rarBar = document.querySelector('.cat-rar-filters');
        if (rarBar) rarBar.style.display = (tab === 'immortal' || tab === 'magic') ? 'none' : 'flex';
        this.renderFacFilters(); this.render();
    }

    setRar(r) {
        this.rarFilter = r;
        document.querySelectorAll('.cat-rar-filters .rar-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.cat-rar-filters .rar-${r}`)?.classList.add('active');
        this.render();
    }

    renderFacFilters() {
        const bar = document.getElementById('catFacFilters'); if (!bar) return;
        bar.innerHTML = '';
        if (this.tab === 'rift' || this.tab === 'magic') { bar.style.display = 'none'; return; }
        bar.style.display = 'flex';
        let opts = [];
        if (this.tab === 'immortal') {
            const facIds = [...new Set(IMMORTALS.flatMap(im => im.factions))];
            opts = [{ id: 'all', label: 'All', icon: '✦', color: 'var(--gold)' }];
            facIds.forEach(fid => { const f = FACTIONS.find(x => x.id === fid); if (f) opts.push({ id: fid, label: f.name, icon: f.icon, color: f.color }); });
            if (IMMORTALS.some(im => im.factions.length > 1)) opts.push({ id: 'mixed', label: 'Multi-Faction', icon: '◈', color: '#b0b8c8' });
        } else {
            opts = [{ id: 'all', label: 'All', icon: '✦', color: 'var(--gold)' }];
            FACTIONS.forEach(f => opts.push({ id: f.id, label: f.name, icon: f.icon, color: f.color }));
        }
        opts.forEach(f => {
            const isActive = this.facFilter === f.id;
            const btn = document.createElement('button');
            btn.className = 'cf-btn' + (isActive ? ' active' : '');
            btn.style.cssText = isActive ? `border-color:${f.color};color:${f.color};background:${f.color}22;` : '';
            btn.innerHTML = `${f.icon} ${f.label}`;
            btn.onclick = () => { this.facFilter = f.id; this.renderFacFilters(); this.render(); };
            bar.appendChild(btn);
        });
    }

    render() {
        if (!document.querySelector('.cat-tab.active')) document.getElementById('ctab-immortal')?.classList.add('active');
        this.renderFacFilters();
        const body = document.getElementById('catBody'); body.innerHTML = '';
        const tt = app.tooltip;

        if (this.tab === 'immortal') {
            let imms = IMMORTALS;
            if (this.facFilter === 'mixed') imms = imms.filter(im => im.factions.length > 1);
            else if (this.facFilter !== 'all') imms = imms.filter(im => im.factions.includes(this.facFilter));
            if (!imms.length) { body.innerHTML = '<div style="text-align:center;padding:60px;color:var(--dim);font-family:Cinzel,serif;font-size:.7rem;letter-spacing:2px;">No immortals found</div>'; return; }
            const grid = document.createElement('div'); grid.className = 'cat-im-grid';
            imms.forEach(im => {
                const card = document.createElement('div'); card.className = 'cat-im-card';
                if (im.realArt) { card.style.cssText = 'padding:0;overflow:hidden;cursor:default;'; card.innerHTML = `<img src="${UIRenderer.encodeArtPath(im.realArt)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.onerror=null;this.parentNode.style.padding='10px';this.parentNode.innerHTML='<div style=\\'font-size:2rem;text-align:center;padding:16px;\\'>👑</div><div style=\\'font-family:Cinzel,serif;font-size:.65rem;color:var(--bright);text-align:center;\\'>${im.name}</div>'">`; }
                else card.innerHTML = `<div style="font-size:2.5rem;text-align:center;padding:20px;">${im.art || '👑'}</div><div style="font-family:Cinzel,serif;font-size:.7rem;color:var(--bright);text-align:center;">${im.name}</div>`;
                card.addEventListener('mouseenter', e => tt.showImmortalTooltip(im, e)); card.addEventListener('mouseleave', () => tt.hideTooltip());
                grid.appendChild(card);
            });
            body.appendChild(grid); return;
        }
        if (this.tab === 'rift') {
            const sec = document.createElement('div'); sec.className = 'cat-section';
            sec.innerHTML = '<div class="cat-section-title" style="color:var(--gold)">⚡ Rift Cards <span style="font-size:.5rem;color:var(--dim);margin-left:8px;">— 1 per deck required</span></div>';
            const row = document.createElement('div'); row.className = 'cat-cards-row';
            RIFTS.filter(c => this.rarFilter === 'all' || c.rarity === this.rarFilter).forEach(card => {
                const w = document.createElement('div'); w.style.cssText = 'position:relative;';
                w.innerHTML = app.ui.riftCardHtml(card);
                w.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseenter', e => tt.showRiftTooltip(card, e));
                w.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseleave', () => tt.hideTooltip());
                row.appendChild(w);
            });
            sec.appendChild(row); body.appendChild(sec); return;
        }
        if (this.tab === 'magic') { body.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;gap:16px;"><div style="font-size:3rem;">✨</div><div style="font-family:'Cinzel Decorative',serif;font-size:1rem;color:var(--gold2);">Coming Soon</div><div style="font-family:'Spectral',serif;color:var(--dim);font-size:.85rem;text-align:center;max-width:300px;line-height:1.7;">Magic cards will be added in a future expansion of the Standard Set.</div></div>`; return; }

        // Creature tab
        const showFacs = this.facFilter === 'all' ? FACTIONS : FACTIONS.filter(f => f.id === this.facFilter);
        showFacs.forEach(f => {
            const baseCards = f.id === 'neutral' ? NEUTRALS : FACTION_CARDS.filter(c => c.type === f.id);
            const cards = baseCards.filter(c => this.rarFilter === 'all' || c.rarity === this.rarFilter);
            if (!cards.length) return;
            const sec = document.createElement('div'); sec.className = 'cat-section'; sec.style.cssText = `border-color:${f.color};`;
            sec.innerHTML = `<div class="cat-section-title" style="color:${f.color}">${f.icon} ${f.name}</div>`;
            const row = document.createElement('div'); row.className = 'cat-cards-row';
            cards.forEach(card => {
                const rar = card.rarity || (card.cost >= 4 ? 'gold' : card.cost >= 3 ? 'silver' : 'bronze');
                const w = document.createElement('div'); w.style.cssText = 'position:relative;';
                w.innerHTML = app.ui.cardHtml(card, `card card-lg rarity-${rar}`);
                w.querySelector('.card').addEventListener('mouseenter', e => tt.showTooltip(card, e));
                w.querySelector('.card').addEventListener('mouseleave', () => tt.hideTooltip());
                row.appendChild(w);
            });
            sec.appendChild(row); body.appendChild(sec);
        });
        if (!body.children.length) body.innerHTML = '<div style="text-align:center;padding:60px;color:var(--dim);font-family:Cinzel,serif;font-size:.7rem;letter-spacing:2px;">No cards found</div>';
    }
}

// ═══════════════════════════════════════════════════════════════════
//  DECK BUILDER UI — custom deck creation and management
// ═══════════════════════════════════════════════════════════════════

class DeckBuilderUI {
    constructor() {
        this.DECKS_KEY = 'soulbound_decks_v2';
        this.immortal = null;
        this.deck = [];
        this.rarFilter = 'all';
        this.facFilter = 'all';
        this.imFacFilter = 'all';
    }

    // ── Storage ──
    getSavedDecks() { try { return JSON.parse(localStorage.getItem(this.DECKS_KEY)) || []; } catch (e) { return []; } }
    setSavedDecks(decks) { try { localStorage.setItem(this.DECKS_KEY, JSON.stringify(decks)); } catch (e) { } }
    deleteSavedDeck(id) { this.setSavedDecks(this.getSavedDecks().filter(d => d.id !== id)); this.renderStep1(); }

    // ── Navigation ──
    init() { this.immortal = null; this.deck = []; const n = document.getElementById('dbDeckName'); if (n) n.value = ''; this.goStep1(); this.renderStep1(); }
    goStep1() { document.getElementById('db-step1').style.display = 'flex'; document.getElementById('db-step2').style.display = 'none'; }
    goStep2() { document.getElementById('db-step1').style.display = 'none'; document.getElementById('db-step2').style.display = 'flex'; }

    // ── Step 1 ──
    renderStep1() { this.imFacFilter = 'all'; this.renderImFacFilters(); this.renderImmortals(); this.renderSavedDecks(); }

    renderImFacFilters() {
        const bar = document.getElementById('dbImFacFilters'); if (!bar) return;
        const facIds = [...new Set(IMMORTALS.flatMap(im => im.factions))];
        const opts = [{ id: 'all', label: 'All', icon: '✦', color: 'var(--gold)' }];
        facIds.forEach(fid => { const f = FACTIONS.find(x => x.id === fid); if (f) opts.push({ id: fid, label: f.name, icon: f.icon, color: f.color }); });
        if (IMMORTALS.some(im => im.factions.length > 1)) opts.push({ id: 'mixed', label: 'Multi-Faction', icon: '◈', color: '#b0b8c8' });
        bar.innerHTML = '';
        opts.forEach(o => {
            const active = this.imFacFilter === o.id;
            const btn = document.createElement('button');
            btn.className = 'im-fac-filter-btn' + (active ? ' active' : '');
            btn.style.cssText = active ? `border-color:${o.color};color:${o.color};background:${o.color}22;` : '';
            btn.innerHTML = `${o.icon} ${o.label}`;
            btn.onclick = () => { this.imFacFilter = o.id; this.renderImFacFilters(); this.renderImmortals(); };
            bar.appendChild(btn);
        });
    }

    renderImmortals() {
        const grid = document.getElementById('dbImmortals'); if (!grid) return;
        grid.innerHTML = '';
        const list = IMMORTALS.filter(im => { if (this.imFacFilter === 'all') return true; if (this.imFacFilter === 'mixed') return im.factions.length > 1; return im.factions.includes(this.imFacFilter); });
        list.forEach(im => {
            const card = document.createElement('div'); card.className = 'db-im-card';
            if (this.immortal && this.immortal.id === im.id) card.classList.add('active');
            if (im.realArt) { card.style.cssText = 'padding:0;overflow:hidden;'; card.innerHTML = `<img src="${UIRenderer.encodeArtPath(im.realArt)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.onerror=null;this.parentNode.style.padding='10px';this.parentNode.innerHTML='<div style=\\'font-size:2rem;text-align:center;padding:12px;\\'>👑</div><div style=\\'font-family:Cinzel,serif;font-size:.55rem;text-align:center;color:var(--bright);\\'>${im.name}</div>'">`; }
            else card.innerHTML = `<div style="font-size:2rem;text-align:center;padding:16px;">${im.art || '👑'}</div><div style="font-family:Cinzel,serif;font-size:.55rem;text-align:center;color:var(--bright);padding:4px 8px;">${im.name}</div>`;
            card.addEventListener('mouseenter', e => app.tooltip.showImmortalTooltip(im, e));
            card.addEventListener('mouseleave', () => app.tooltip.hideTooltip());
            card.onclick = () => this.selectImmortal(im);
            grid.appendChild(card);
        });
    }

    selectImmortal(im) {
        const game = app.game;
        this.immortal = im; this.deck = []; this.facFilter = 'all'; this.rarFilter = 'all';
        document.getElementById('dbDeckName').value = '';
        this.renderImmortals();
        document.getElementById('dbStep2Title').textContent = `${im.name} — Build Deck`;
        this.renderFac2Filters(); this.renderPool(); this.renderDeck(); this.renderImmortalPreview();
        this.goStep2();
    }

    loadSaved(deck) {
        const im = IMMORTALS.find(x => x.id === deck.immortalId);
        if (!im) { alert('Immortal not found'); return; }
        const game = app.game;
        this.immortal = im; this.facFilter = 'all'; this.rarFilter = 'all';
        const allCards = [...FACTION_CARDS, ...NEUTRALS, ...RIFTS.map(r => game.mkRift(r))];
        this.deck = deck.cardIds.map(cid => { const base = allCards.find(c => c.id === cid); return base ? (base.isRift ? game.mkRift(base) : game.mk(base)) : null; }).filter(Boolean);
        document.getElementById('dbDeckName').value = deck.name || '';
        document.getElementById('dbStep2Title').textContent = `${im.name} — ${deck.name || 'Deck'}`;
        this.renderFac2Filters(); this.renderPool(); this.renderDeck(); this.renderImmortalPreview();
        this.goStep2();
    }

    renderSavedDecks() {
        const decks = this.getSavedDecks();
        const strip = document.getElementById('dbSavedStrip');
        const list = document.getElementById('dbSavedList');
        if (!strip || !list) return;
        strip.style.display = decks.length ? 'block' : 'none';
        list.innerHTML = '';
        decks.forEach(deck => {
            const im = IMMORTALS.find(x => x.id === deck.immortalId);
            const tile = document.createElement('div'); tile.className = 'db-saved-tile';
            tile.style.cssText = `border-color:${im ? im.color : 'var(--gold)'};`;
            tile.innerHTML = `<div class="db-saved-name">${deck.name || 'Unnamed Deck'}</div><div class="db-saved-meta">${im ? im.name : '?'} · ${deck.cardIds.length} cards</div><div class="db-saved-actions"><button class="btn btn-sm btn-grn" onclick="dbLoadSaved(${JSON.stringify(deck).replace(/"/g, '&quot;')})">Load</button><button class="btn btn-sm btn-red" onclick="deleteSavedDeck('${deck.id}');event.stopPropagation()">✕</button></div>`;
            list.appendChild(tile);
        });
    }

    // ── Step 2 ──
    renderFac2Filters() {
        const bar = document.getElementById('db2FacBtns'); if (!bar || !this.immortal) return;
        const opts = [{ id: 'all', label: 'All', icon: '✦', color: 'var(--gold)' }, { id: 'rift', label: 'Rift', icon: '⚡', color: '#d4a843' },
        ...this.immortal.factions.map(fid => { const f = FACTIONS.find(x => x.id === fid); return { id: fid, label: f.name, icon: f.icon, color: f.color }; }),
        { id: 'neutral', label: 'Neutral', icon: '⚪', color: 'var(--neutral)' }];
        bar.innerHTML = '';
        opts.forEach(o => {
            const active = this.facFilter === o.id;
            const btn = document.createElement('button');
            btn.className = 'im-fac-filter-btn' + (active ? ' active' : '');
            btn.style.cssText = active ? `border-color:${o.color};color:${o.color};background:${o.color}22;` : '';
            btn.innerHTML = `${o.icon} ${o.label}`;
            btn.onclick = () => { this.facFilter = o.id; this.renderFac2Filters(); this.renderPool(); };
            bar.appendChild(btn);
        });
    }

    renderImmortalPreview() {
        const el = document.getElementById('dbImmortalPreview'); if (!el || !this.immortal) return;
        if (this.immortal.realArt) el.innerHTML = `<img src="${UIRenderer.encodeArtPath(this.immortal.realArt)}" style="width:100%;border-radius:6px;display:block;margin-bottom:8px;">`;
        else el.innerHTML = `<div style="font-size:2rem;text-align:center;">${this.immortal.art}</div>`;
    }

    setRarFilter(r) {
        this.rarFilter = r;
        document.querySelectorAll('#db-step2 .rar-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`#db-step2 .rar-${r}`)?.classList.add('active');
        this.renderPool();
    }

    renderPool() {
        const pool = document.getElementById('dbPool'); pool.innerHTML = '';
        if (!this.immortal) return;
        const search = (document.getElementById('dbSearch')?.value || '').toLowerCase().trim();
        const game = app.game; const tt = app.tooltip;
        const passesFilters = (card) => { if (this.rarFilter !== 'all' && card.rarity !== this.rarFilter) return false; if (search && !card.name.toLowerCase().includes(search)) return false; return true; };

        // Rift section
        if (this.facFilter === 'all' || this.facFilter === 'rift') {
            const riftCards = RIFTS.filter(c => passesFilters(c));
            if (riftCards.length) {
                const hasRift = this.deck.some(c => c.isRift);
                const sec = document.createElement('div'); sec.className = 'db-pool-section';
                sec.innerHTML = `<div class="db-pool-lbl" style="color:#c8960e">⚡ Rift ${hasRift ? '<span style="color:var(--beast)">✓ selected</span>' : '<span style="color:var(--infernal)">— 1 required</span>'}</div>`;
                const row = document.createElement('div'); row.className = 'db-pool-row';
                riftCards.forEach(card => {
                    const already = this.deck.some(c => c.id === card.id);
                    const w = document.createElement('div'); w.style.cssText = 'position:relative;cursor:pointer;';
                    w.innerHTML = app.ui.riftCardHtml(card) + (already ? '<div style="position:absolute;inset:0;background:rgba(200,150,14,.18);border:2px solid #c8960e;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;z-index:10;pointer-events:none;color:#c8960e;">✓</div>' : '');
                    w.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseenter', e => tt.showRiftTooltip(card, e));
                    w.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseleave', () => tt.hideTooltip());
                    w.onclick = () => { this.deck = this.deck.filter(c => !c.isRift); if (!already) this.deck.push(game.mkRift(card)); this.renderPool(); this.renderDeck(); };
                    row.appendChild(w);
                });
                sec.appendChild(row); pool.appendChild(sec);
            }
            if (this.facFilter === 'rift') return;
        }

        // Faction sections
        const facsToDraw = this.facFilter === 'all' ? [...this.immortal.factions, 'neutral'] : this.facFilter === 'neutral' ? ['neutral'] : [this.facFilter];
        facsToDraw.forEach(fid => {
            const f = FACTIONS.find(x => x.id === fid) || { color: 'var(--neutral)', icon: '⚪', name: 'Neutral' };
            const baseCards = fid === 'neutral' ? NEUTRALS : FACTION_CARDS.filter(c => c.type === fid);
            const cards = baseCards.filter(passesFilters);
            if (!cards.length) return;
            const sec = document.createElement('div'); sec.className = 'db-pool-section';
            sec.innerHTML = `<div class="db-pool-lbl" style="color:${f.color}">${f.icon} ${f.name} <span style="font-size:.44rem;color:var(--dim)">(${cards.length})</span></div>`;
            const row = document.createElement('div'); row.className = 'db-pool-row';
            cards.forEach(card => {
                const cnt = this.deck.filter(x => x.id === card.id).length;
                const w = document.createElement('div'); w.className = 'db-card-wrap';
                if (cnt >= 2) w.style.opacity = '.45';
                w.innerHTML = app.ui.cardHtml(card, 'card card-sm');
                if (cnt > 0) { const b = document.createElement('div'); b.className = 'db-count-badge'; b.textContent = '×' + cnt; w.appendChild(b); }
                w.querySelector('.card').addEventListener('mouseenter', e => tt.showTooltip(card, e));
                w.querySelector('.card').addEventListener('mouseleave', () => tt.hideTooltip());
                w.onclick = () => this.addCard(card);
                row.appendChild(w);
            });
            sec.appendChild(row); pool.appendChild(sec);
        });
        if (!pool.children.length) pool.innerHTML = '<div style="text-align:center;padding:40px;color:var(--dim);font-family:Cinzel,serif;font-size:.65rem;">No cards match your filters</div>';
    }

    addCard(card) {
        const cnt = this.deck.filter(x => x.id === card.id).length;
        if (cnt >= 2) { this.showMsg('Max 2 copies per card.', 'dmg'); return; }
        if (this.deck.length >= 40) { this.showMsg('Deck is full (40 cards).', 'dmg'); return; }
        this.deck.push(app.game.mk(card)); this.renderPool(); this.renderDeck();
    }
    removeCard(id) { const idx = this.deck.findIndex(c => c.id === id); if (idx >= 0) this.deck.splice(idx, 1); this.renderPool(); this.renderDeck(); }
    clearDeck() { if (!confirm('Clear your entire deck?')) return; this.deck = []; this.renderPool(); this.renderDeck(); }

    renderDeck() {
        const el = document.getElementById('dbList'); const countEl = document.getElementById('dbCount'); const msgEl = document.getElementById('dbDeckMsg');
        el.innerHTML = '';
        if (countEl) countEl.textContent = `${this.deck.length}/40`;
        const hasRift = this.deck.some(c => c.isRift);
        if (msgEl) {
            if (!hasRift) { msgEl.style.color = 'var(--infernal)'; msgEl.textContent = '⚡ Rift card required'; }
            else if (this.deck.length < 10) { msgEl.style.color = 'var(--dim)'; msgEl.textContent = `Add ${10 - this.deck.length} more cards`; }
            else { msgEl.style.color = 'var(--beast)'; msgEl.textContent = '✓ Ready to save'; }
        }
        const grouped = {};
        this.deck.forEach(c => { if (!grouped[c.id]) grouped[c.id] = { card: c, count: 0 }; grouped[c.id].count++; });
        const tt = app.tooltip;
        Object.values(grouped).forEach(({ card, count }) => {
            const f = FACTIONS.find(x => x.id === card.type) || FACTIONS[6];
            const d = document.createElement('div'); d.className = 'db-item';
            d.innerHTML = `<span class="db-item-dot" style="color:${card.isRift ? '#d4a843' : f.color}">${card.isRift ? '⚡' : '●'}</span><span class="db-item-name">${card.name}</span><span class="db-item-cnt">${count > 1 ? '×' + count : ''}</span><span class="db-item-rm">✕</span>`;
            d.addEventListener('mouseenter', e => card.isRift ? tt.showRiftTooltip(card, e) : tt.showTooltip(card, e));
            d.addEventListener('mouseleave', () => tt.hideTooltip());
            d.querySelector('.db-item-rm').onclick = (e) => { e.stopPropagation(); this.removeCard(card.id); };
            el.appendChild(d);
        });
    }

    saveDeck() {
        if (!this.immortal) { this.showMsg('Select an Immortal first.', 'dmg'); return; }
        if (this.deck.length < 10) { this.showMsg('Add at least 10 cards.', 'dmg'); return; }
        if (!this.deck.some(c => c.isRift)) { this.showMsg('A Rift card is required.', 'dmg'); return; }
        const name = (document.getElementById('dbDeckName').value || '').trim() || `${this.immortal.name}'s Deck`;
        const decks = this.getSavedDecks();
        const existing = decks.find(d => d.name === name);
        if (existing) { existing.cardIds = this.deck.map(c => c.id); existing.immortalId = this.immortal.id; existing.updated = Date.now(); this.setSavedDecks(decks); this.showMsg(`"${name}" updated!`, 'heal'); }
        else { decks.push({ id: 'deck_' + Date.now(), name, immortalId: this.immortal.id, cardIds: this.deck.map(c => c.id), created: Date.now() }); this.setSavedDecks(decks); this.showMsg(`"${name}" saved!`, 'heal'); }
        this.renderSavedDecks();
    }

    showMsg(msg, type = '') {
        const el = document.getElementById('dbDeckMsg'); if (!el) return;
        el.style.color = type === 'dmg' ? 'var(--infernal)' : type === 'heal' ? 'var(--beast)' : 'var(--gold)';
        el.textContent = msg;
        setTimeout(() => { if (el.textContent === msg) { el.style.color = 'var(--dim)'; this.renderDeck(); } }, 2500);
    }
}

// ═══════════════════════════════════════════════════════════════════
//  SETUP UI — immortal selection, initiative, deck preview
// ═══════════════════════════════════════════════════════════════════

class SetupUI {
    constructor() {
        this.imFacFilter = 'all';
    }

    /** Render the full setup screen */
    renderSetup() {
        const game = app.game;
        game.chosenImmortal = null; game.chosenDeckId = null;
        this.imFacFilter = 'all';
        document.getElementById('startBtn').disabled = true;
        this.closeDeckPreview(); this.renderSavedDecksInSetup();
        this.renderImFacFilters(); this.renderImGrid();
    }

    renderImFacFilters() {
        const bar = document.getElementById('imFacFilters'); if (!bar) return;
        const facIds = [...new Set(IMMORTALS.flatMap(im => im.factions))];
        const hasMixed = IMMORTALS.some(im => im.factions.length > 1);
        const filters = [{ id: 'all', label: 'All', icon: '✦', color: 'var(--gold)' }];
        facIds.forEach(fid => { const f = FACTIONS.find(x => x.id === fid); if (f) filters.push({ id: fid, label: f.name, icon: f.icon, color: f.color }); });
        if (hasMixed) filters.push({ id: 'mixed', label: 'Multi-Faction', icon: '◈', color: '#b0b8c8' });
        bar.innerHTML = '';
        filters.forEach(f => {
            const isActive = this.imFacFilter === f.id;
            const btn = document.createElement('button');
            btn.className = 'im-fac-filter-btn' + (isActive ? ' active' : '');
            btn.style.cssText = `border-color:${isActive ? f.color : 'var(--iron2)'};color:${isActive ? f.color : 'var(--dim)'};background:${isActive ? f.color + '22' : 'transparent'};`;
            btn.innerHTML = `${f.icon} ${f.label}`;
            btn.onclick = () => { this.imFacFilter = f.id; this.renderImFacFilters(); this.renderImGrid(); };
            bar.appendChild(btn);
        });
    }

    renderImGrid() {
        const game = app.game; const tt = app.tooltip;
        const grid = document.getElementById('imPickGrid'); grid.innerHTML = '';
        const filtered = IMMORTALS.filter(im => { if (this.imFacFilter === 'all') return true; if (this.imFacFilter === 'mixed') return im.factions.length > 1; return im.factions.includes(this.imFacFilter); });
        filtered.forEach(im => {
            const d = document.createElement('div'); d.className = 'im-pick-card'; d.id = 'ipc_' + im.id;
            if (game.chosenImmortal && game.chosenImmortal.id === im.id) d.classList.add('sel');
            if (im.realArt) { d.style.cssText = 'padding:0;overflow:hidden;'; d.innerHTML = app.ui.immortalPickHtml(im); }
            else { const facChips = im.factions.map(f => { const fc = FACTIONS.find(x => x.id === f); return `<span class="fac-chip" style="color:${fc.color};border-color:${fc.color}">${fc.icon} ${fc.name}</span>`; }).join(''); d.innerHTML = `<div class="im-art-big">${im.art}</div><div class="im-pick-name">${im.name}</div><div class="im-fac-chips">${facChips}<span class="fac-chip" style="color:var(--neutral);border-color:var(--neutral)">⚪ Neutral</span></div><div class="im-ability-name">${im.abilityName}</div><div class="im-ability-desc">${im.desc}</div>`; }
            d.onclick = () => this.selectImmortal(im);
            d.addEventListener('mouseenter', e => tt.showImmortalTooltip(im, e));
            d.addEventListener('mouseleave', () => tt.hideTooltip());
            grid.appendChild(d);
        });
    }

    selectImmortal(im) {
        const game = app.game;
        if (game.chosenImmortal && game.chosenImmortal.id === im.id) {
            game.chosenImmortal = null; game.chosenDeckId = null;
            document.querySelectorAll('.im-pick-card').forEach(el => el.classList.remove('sel'));
            document.getElementById('startBtn').disabled = true;
            const pdBtn = document.getElementById('previewDeckBtn'); if (pdBtn) pdBtn.style.display = 'none';
            this.closeDeckPreview(); this.renderSavedDecksInSetup(); return;
        }
        game.chosenImmortal = im; game.chosenDeckId = null;
        document.querySelectorAll('.im-pick-card').forEach(el => el.classList.remove('sel'));
        const ipc = document.getElementById('ipc_' + im.id); if (ipc) ipc.classList.add('sel');
        document.getElementById('startBtn').disabled = false;
        const pdBtn = document.getElementById('previewDeckBtn'); if (pdBtn) pdBtn.style.display = 'inline-block';
        this.renderSavedDecksInSetup(); this.showDeckPreview(im);
    }

    selectSavedDeck(id) {
        const game = app.game;
        const decks = app.deckBuilder.getSavedDecks();
        const deck = decks.find(d => d.id === id); if (!deck) return;
        const im = IMMORTALS.find(x => x.id === deck.immortalId); if (!im) return;
        game.chosenDeckId = id; game.chosenImmortal = im;
        document.querySelectorAll('.im-pick-card').forEach(el => el.classList.remove('sel'));
        const ipc = document.getElementById('ipc_' + im.id); if (ipc) ipc.classList.add('sel');
        document.getElementById('startBtn').disabled = false;
        this.closeDeckPreview(); this.renderSavedDecksInSetup();
    }

    renderSavedDecksInSetup() {
        const game = app.game;
        const decks = app.deckBuilder.getSavedDecks();
        const wrap = document.getElementById('savedDecksSetup');
        const list = document.getElementById('savedDecksList');
        if (!wrap || !list) return;
        if (!decks.length) { wrap.style.display = 'none'; return; }
        wrap.style.display = 'block'; list.innerHTML = '';
        const tt = app.tooltip;
        decks.forEach(deck => {
            const im = IMMORTALS.find(x => x.id === deck.immortalId);
            const fac = im ? FACTIONS.find(f => f.id === im.factions[0]) : null;
            const facColor = fac ? fac.color : 'var(--gold)';
            const facNames = im ? im.factions.map(f => FACTIONS.find(x => x.id === f)?.name || f).join('/') : '?';
            const active = game.chosenDeckId === deck.id;
            const d = document.createElement('div');
            d.className = 'saved-deck-tile' + (active ? ' active' : '');
            d.style.cssText = `background:linear-gradient(160deg,var(--bg4) 0%,var(--bg2) 100%);border:2px solid ${active ? facColor : 'var(--iron2)'};padding:12px 14px;cursor:pointer;transition:all .25s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);min-width:150px;position:relative;box-shadow:${active ? '0 0 20px ' + facColor + '44' : 'none'};`;
            d.innerHTML = `<div style="font-size:1.5rem;margin-bottom:5px;filter:drop-shadow(0 0 8px ${facColor}88)">${deck.immortalArt || '⚔'}</div><div style="font-family:'Cinzel',serif;font-size:.65rem;color:${facColor};letter-spacing:1px;margin-bottom:2px;">${deck.name}</div><div style="font-family:'Cinzel',serif;font-size:.48rem;color:var(--dim);">${facNames} · ${deck.count || deck.cardIds?.length || '?'} cards</div>${active ? `<div style="position:absolute;top:5px;right:7px;font-size:.5rem;color:${facColor};font-family:'Cinzel',serif;">✦ SELECTED</div>` : ''}`;
            d.onclick = () => this.selectSavedDeck(deck.id);
            d.addEventListener('mouseenter', e => { if (im) tt.showImmortalTooltip(im, e); });
            d.addEventListener('mouseleave', () => tt.hideTooltip());
            list.appendChild(d);
        });
    }

    showDeckPreview(im) {
        const tt = app.tooltip;
        document.getElementById('dpModalTitle').textContent = `${im.name} — Deck Preview`;
        document.getElementById('dpModalSub').textContent = im.factions.map(f => FACTIONS.find(x => x.id === f).name).join(' + ') + ' + Neutral';
        const content = document.getElementById('dpModalContent'); content.innerHTML = '';
        im.factions.forEach(fid => {
            const f = FACTIONS.find(x => x.id === fid);
            const fCards = FACTION_CARDS.filter(c => c.type === fid);
            const sec = document.createElement('div'); sec.className = 'dp-section';
            sec.innerHTML = `<div class="dp-section-lbl" style="color:${f.color}">${f.icon} ${f.name} Cards (${fCards.length} unique · ×2 each)</div>`;
            const row = document.createElement('div'); row.className = 'dp-cards';
            fCards.forEach(card => { const w = document.createElement('div'); w.style.position = 'relative'; w.innerHTML = app.ui.cardHtml(card, 'card card-sm'); w.querySelector('.card').addEventListener('mouseenter', e => tt.showTooltip(card, e)); w.querySelector('.card').addEventListener('mouseleave', () => tt.hideTooltip()); row.appendChild(w); });
            sec.appendChild(row); content.appendChild(sec);
        });
        const nsec = document.createElement('div'); nsec.className = 'dp-section';
        nsec.innerHTML = `<div class="dp-section-lbl" style="color:var(--neutral)">⚪ Neutral Cards (${NEUTRALS.length} unique · ×2 each)</div>`;
        const nrow = document.createElement('div'); nrow.className = 'dp-cards';
        NEUTRALS.forEach(card => { const w = document.createElement('div'); w.style.position = 'relative'; w.innerHTML = app.ui.cardHtml(card, 'card card-sm'); w.querySelector('.card').addEventListener('mouseenter', e => tt.showTooltip(card, e)); w.querySelector('.card').addEventListener('mouseleave', () => tt.hideTooltip()); nrow.appendChild(w); });
        nsec.appendChild(nrow); content.appendChild(nsec);
        const previewRift = RIFTS[Math.floor(Math.random() * RIFTS.length)];
        const rsec = document.createElement('div'); rsec.className = 'dp-section';
        rsec.innerHTML = `<div class="dp-section-lbl" style="color:#c8960e">⚡ Rift Card — 1 random card included</div>`;
        const rrow = document.createElement('div'); rrow.className = 'dp-cards'; rrow.style.cssText = 'gap:10px;align-items:flex-start;';
        const rw = document.createElement('div'); rw.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;';
        rw.innerHTML = app.ui.riftCardHtml(previewRift) + `<div style="font-family:'Cinzel',serif;font-size:.5rem;letter-spacing:2px;color:var(--dim);text-align:center;">RANDOM PER GAME</div>`;
        rw.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseenter', e => tt.showRiftTooltip(previewRift, e));
        rw.querySelector('.rift-card-img,.rift-card')?.addEventListener('mouseleave', () => tt.hideTooltip());
        rrow.appendChild(rw); rsec.appendChild(rrow); content.appendChild(rsec);
        document.getElementById('deckPreviewModal').classList.add('show');
    }

    closeDeckPreview() { document.getElementById('deckPreviewModal').classList.remove('show'); }

    // ── Initiative roll ──

    showInitiativeRoll() {
        const d1 = document.getElementById('initDie1'); const d2 = document.getElementById('initDie2');
        d1.textContent = '?'; d2.textContent = '?'; d1.className = 'init-die'; d2.className = 'init-die';
        document.getElementById('initResult').textContent = '';
        document.getElementById('initRollBtn').style.display = 'inline-block';
        document.getElementById('initRollBtn').textContent = 'Roll Dice';
        document.getElementById('initRollBtn').disabled = false;
        document.getElementById('initContinueBtn').style.display = 'none';
        document.getElementById('initiativeOverlay').classList.add('show');
    }

    rollInitiative() {
        const die1El = document.getElementById('initDie1'); const die2El = document.getElementById('initDie2');
        const resultEl = document.getElementById('initResult'); resultEl.textContent = '';
        document.getElementById('initRollBtn').disabled = true;
        let ticks = 0; const totalTicks = 22;
        die1El.classList.add('rolling'); die2El.classList.add('rolling');
        const anim = setInterval(() => {
            ticks++;
            die1El.textContent = Math.ceil(Math.random() * 6);
            die2El.textContent = Math.ceil(Math.random() * 6);
            if (ticks >= totalTicks) {
                clearInterval(anim);
                die1El.classList.remove('rolling'); die2El.classList.remove('rolling');
                const d1 = Math.ceil(Math.random() * 6); const d2 = Math.ceil(Math.random() * 6);
                die1El.textContent = d1; die2El.textContent = d2;
                die1El.classList.add('landed'); die2El.classList.add('landed');
                document.getElementById('initRollBtn').disabled = false;
                if (d1 > d2) {
                    app.game.initiativeWinner = 1;
                    die1El.style.setProperty('--die-glow', 'rgba(212,168,67,.7)'); die1El.classList.add('winner'); die2El.classList.add('loser');
                    resultEl.innerHTML = `<span style="color:var(--gold)">You rolled <strong>${d1}</strong> vs <strong>${d2}</strong> — You go first!</span>`;
                    document.getElementById('initRollBtn').style.display = 'none'; document.getElementById('initContinueBtn').style.display = 'inline-block';
                } else if (d2 > d1) {
                    app.game.initiativeWinner = 2;
                    die2El.style.setProperty('--die-glow', 'rgba(224,48,48,.7)'); die2El.classList.add('winner'); die1El.classList.add('loser');
                    resultEl.innerHTML = `<span style="color:#e03030">You rolled <strong>${d1}</strong> vs <strong>${d2}</strong> — Adversary goes first!</span>`;
                    document.getElementById('initRollBtn').style.display = 'none'; document.getElementById('initContinueBtn').style.display = 'inline-block';
                } else {
                    resultEl.innerHTML = `<span style="color:var(--dim)">Both rolled <strong>${d1}</strong> — Tie! Roll again.</span>`;
                    document.getElementById('initRollBtn').textContent = 'Reroll'; document.getElementById('initRollBtn').style.display = 'inline-block';
                }
            }
        }, ticks < 10 ? 50 : 80);
    }

    initiativeDone() {
        document.getElementById('initiativeOverlay').classList.remove('show');
        app.game.startGameNow();
    }
}

// ═══════════════════════════════════════════════════════════════════
//  APP INSTANCE — global singleton binding all managers together
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
//  PRELOADER — loads card art with progress bar before showing screens
// ═══════════════════════════════════════════════════════════════════

class Preloader {
    constructor() {
        this._cache = new Set();  // already loaded image paths
        this._loaded = false;     // true after first full preload
    }

    /** Flavor text lines — cycled during loading */
    static FLAVORS = [
        'Awakening ancient souls...',
        'Summoning immortal warriors...',
        'Sharpening blades of the fallen...',
        'Binding spirits to the cards...',
        'Drawing power from the rift...',
        'The arena hungers for battle...',
        'Forging armor from cursed iron...',
        'Channeling divine light...',
        'Whispering to the void...',
        'Gathering souls from the abyss...',
        'Preparing the battlefield...',
        'Invoking the old gods...',
        'Tempering steel in dragonfire...',
        'Unraveling forbidden scrolls...',
        'The cards answer your call...',
    ];

    /** Titles per screen context */
    static TITLES = {
        catalogue: 'Opening the Archives...',
        deckbuilder: 'Preparing the Forge...',
        game: 'Entering the Arena...',
    };

    /** Collect all card art paths that need loading */
    _getArtPaths() {
        const paths = [];
        IMMORTALS.forEach(c => { if (c.realArt) paths.push(UIRenderer.encodeArtPath(c.realArt)); });
        FACTION_CARDS.forEach(c => { if (c.realArt) paths.push(UIRenderer.encodeArtPath(c.realArt)); });
        NEUTRALS.forEach(c => { if (c.realArt) paths.push(UIRenderer.encodeArtPath(c.realArt)); });
        RIFTS.forEach(c => { if (c.realArt) paths.push(UIRenderer.encodeArtPath(c.realArt)); });
        return [...new Set(paths)];  // deduplicate
    }

    /**
     * Show loading screen, preload all card art, then call onDone.
     * @param {string} context - 'catalogue' | 'deckbuilder' | 'game'
     * @param {Function} onDone - callback when loading finishes
     */
    async load(context, onDone) {
        const allPaths = this._getArtPaths();
        // Filter out already cached images
        const toLoad = allPaths.filter(p => !this._cache.has(p));

        // If everything is cached, skip the loading screen
        if (toLoad.length === 0) {
            onDone();
            return;
        }

        // Show loading overlay
        const overlay = document.getElementById('loadingOverlay');
        const barFill = document.getElementById('loadingBarFill');
        const pctEl = document.getElementById('loadingPct');
        const titleEl = document.getElementById('loadingTitle');
        const flavorEl = document.getElementById('loadingFlavor');

        titleEl.textContent = Preloader.TITLES[context] || 'Loading...';
        barFill.style.width = '0%';
        pctEl.textContent = '0%';
        flavorEl.textContent = Preloader.FLAVORS[0];
        overlay.classList.add('show');

        // Cycle flavor text
        let flavorIdx = 0;
        const flavorInterval = setInterval(() => {
            flavorIdx = (flavorIdx + 1) % Preloader.FLAVORS.length;
            flavorEl.textContent = Preloader.FLAVORS[flavorIdx];
        }, 1800);

        // Preload all images
        const total = toLoad.length;
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            const pct = Math.round((loaded / total) * 100);
            barFill.style.width = pct + '%';
            pctEl.textContent = pct + '%';
        };

        const promises = toLoad.map(src => new Promise(resolve => {
            const img = new Image();
            img.onload = () => { this._cache.add(src); updateProgress(); resolve(); };
            img.onerror = () => { updateProgress(); resolve(); };  // skip broken images
            img.src = src;
        }));

        await Promise.all(promises);
        this._loaded = true;

        // Small delay so user sees 100%
        barFill.style.width = '100%';
        pctEl.textContent = '100%';
        flavorEl.textContent = 'The cards answer your call...';

        await new Promise(r => setTimeout(r, 400));

        clearInterval(flavorInterval);
        overlay.classList.remove('show');
        onDone();
    }
}

const app = {};

// ═══════════════════════════════════════════════════════════════════
//  GLOBAL FUNCTION WRAPPERS — required by HTML onclick attributes
// ═══════════════════════════════════════════════════════════════════

// Screen navigation
function go(from, to) { app.screen.go(from, to); }

// Setup / selection
function renderSetup() { app.preloader.load('game', () => app.setup.renderSetup()); }
function selectImmortal(im) { app.setup.selectImmortal(im); }
function showDeckPreview(im) { app.setup.showDeckPreview(im); }
function closeDeckPreview() { app.setup.closeDeckPreview(); }
function selectSavedDeck(id) { app.setup.selectSavedDeck(id); }
function showInitiativeRoll() { app.setup.showInitiativeRoll(); }
function rollInitiative() { app.setup.rollInitiative(); }
function initiativeDone() { app.setup.initiativeDone(); }

// Game actions
function nextPhase() { app.game.nextPhase(); }
function confirmPlace(mode) { app.game.confirmPlace(mode); }
function cancelPlace() { app.game.cancelPlace(); }
function activateImmortal() { app.game.activateImmortal(); }
function sacrificeCard() { app.game.sacrificeCard(); }
function openVoidModal(p) { app.game.openVoidModal(p); }
function closeVoidModal() { app.game.closeVoidModal(); }
function selectHandCard(i) { app.game.selectHandCard(i); }
function onSlotClick(p, i) { app.game.onSlotClick(p, i); }
function onFieldCardClick(p, i) { app.game.onFieldCardClick(p, i); }
function cancelAtk() { app.game.cancelAtk(); }

// Dice
function rollDice() { app.dice.rollDice(); }
function rerollDice() { app.dice.rerollDice(); }
function collectDice() { app.dice.collectDice(); }

// Catalogue
function setCatTab(tab) {
    const catScreen = document.getElementById('catalogue-screen');
    if (catScreen && catScreen.classList.contains('active')) {
        app.catalogue.setTab(tab);  // already in catalogue — just switch tab
    } else {
        app.preloader.load('catalogue', () => app.catalogue.setTab(tab));
    }
}
function setCatRar(r) { app.catalogue.setRar(r); }
function renderCatalogue() { app.catalogue.render(); }

// Deck builder
function initDeckBuilder() { app.preloader.load('deckbuilder', () => app.deckBuilder.init()); }
function dbGoStep1() { app.deckBuilder.goStep1(); }
function dbGoStep2() { app.deckBuilder.goStep2(); }
function dbSelectImmortal(im) { app.deckBuilder.selectImmortal(im); }
function dbLoadSaved(deck) { app.deckBuilder.loadSaved(deck); }
function deleteSavedDeck(id) { app.deckBuilder.deleteSavedDeck(id); }
function setDbRarFilter(r) { app.deckBuilder.setRarFilter(r); }
function dbAdd(card) { app.deckBuilder.addCard(card); }
function dbRemove(id) { app.deckBuilder.removeCard(id); }
function clearDeck() { app.deckBuilder.clearDeck(); }
function saveDeck() { app.deckBuilder.saveDeck(); }
function renderDbPool() { app.deckBuilder.renderPool(); }
function getSavedDecks() { return app.deckBuilder.getSavedDecks(); }

// Tooltip
function showTooltip(card, e) { app.tooltip.showTooltip(card, e); }
function showRiftTooltip(card, e) { app.tooltip.showRiftTooltip(card, e); }
function showImmortalTooltip(im, e) { app.tooltip.showImmortalTooltip(im, e); }
function hideTooltip() { app.tooltip.hideTooltip(); }
function toggleHoverInfo() { app.tooltip.toggleHover(); }

// Modals / overlays
function addLog(msg, type) { app.ui.addLog(msg, type); }
function openStore() { document.getElementById('storeOverlay').classList.add('show'); }
function openCredits() { document.getElementById('creditsOverlay').classList.add('show'); }
function openSettings() { document.getElementById('settingsOverlay').classList.add('show'); }
function closeDrawHand() { document.getElementById('drawHandOverlay').classList.remove('show'); }

// ═══════════════════════════════════════════════════════════════════
//  INITIALISATION — wire up all managers on DOM ready
// ═══════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', async () => {
    // Load all card data from JSON (falls back to embedded data if fetch fails)
    await CardLoader.loadAll();

    // Create all managers
    app.screen = new ScreenManager();
    app.anim = new AnimationManager();
    app.tooltip = new TooltipManager();
    app.game = new Game();
    app.ui = new UIRenderer(app.game);
    app.dice = new DiceManager(app.game);
    app.ai = new AIController(app.game);
    app.catalogue = new CatalogueUI();
    app.deckBuilder = new DeckBuilderUI();
    app.setup = new SetupUI();
    app.preloader = new Preloader();

    // Init tooltip element reference
    app.tooltip.init();

    // Start floating cards on title/menu
    app.screen.initMenuCards();

    // Fill rune background
    const RUNES = '᚛ᚔᚓᚕᚑᚐᚙᚗᚉᚃᚁᚏᚍᛠᛟᛞᛝᛜᛛᛚᛙᛘᛗᛖᛕᛓᛒᛏᛎᛍᛌᛋᛊᛉᛈᛇᛆᛅᛄᛃᛂᛁᚿᚾᚽᚼᚻᚺᚹᚸᚷᚶᚵᚴ';
    const rb = document.getElementById('runesBg');
    if (rb) { let s = ''; for (let i = 0; i < 2000; i++) s += RUNES[Math.floor(Math.random() * RUNES.length)] + ' '; rb.textContent = s; }
});
