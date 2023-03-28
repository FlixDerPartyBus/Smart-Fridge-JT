import { Item } from "../interfaces/item";

export const items: Item[] = [
    {
        name: 'Bier',
        cost: 1
    },
    {
        name: 'Eistee',
        cost: 0.5
    },
    {
        name: 'Limo',
        cost: 1
    },
    {
        name: 'Wasser',
        cost: 0.5
    },
    {
        name: 'Pizza',
        cost: 2.5
    },
    {
        name: 'Mozarella Sticks',
        cost: 1
    },
    {
        name: 'Eis',
        cost: 0.25
    },
    {
        name: 'Laugenstangen',
        cost: 0.25
    },
    {
        name: 'Chilly Chees Nuggets',
        cost: 2.5
    },
    {
        name: 'Frühlingsrollen',
        cost: 2.5
    },
]

//Felix hat viel Spaß mit:
/*
- Chip anlegen
- Chip aufladen
- Statistik wieviel Guthaben gesamt auf allen Chips ist
- (Statistik über die Top 10: Wer am meisten ausgegeben hat)
- manuell open
- Abfrage über Infos eines Chips

weitere ToDos 
Inventar System? Wieviel von was noch da ist. Aktualisieren wenn gekauft (zur überwachung intern ob noch sachen 
    ohne bezahlen genommen werden)
*/