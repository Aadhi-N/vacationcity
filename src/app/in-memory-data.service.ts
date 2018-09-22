import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const months = [
      { id: 1, name: "January" },
      { id: 2, name: "February" },
      { id: 3, name: "March" },
      { id: 4, name: "April" },
      { id: 5, name: "May" },
      { id: 6, name: "June" },
      { id: 7, name: "July" },
      { id: 8, name: "August" },
      { id: 9, name: "September" },
      { id: 10, name: "October" },
      { id: 11, name: "November" },
      { id: 11, name: "December" }
    ];
    const seasons = [
      { id: 1, name: "Winter" },
      { id: 2, name: "Spring" },
      { id: 3, name: "Summer" },
      { id: 4, name: "Fall" }
    ];

    const cities = [
      {id: 1,
        name: "Toronto"
      },
      {
        id: 2,
        name: "Tokyo"
      },
      {
        id: 4,
        name: "Los Angeles"
      },
      {
        id: 5,
        name: "Alyeska"
      }
    ];

    const temps = [
      {
        id: 1,
        month: 1,
        avgCelcius: -10
      },
      {
        id: 1,
        month: 2,
        avgCelcius: -18
      },
      {
        id: 1,
        month: 3,
        avgCelcius: -8
      },
      {
        id: 1,
        month: 4,
        avgCelcius: -3
      },
      {
        id: 1,
        month: 5,
        avgCelcius: 5
      },
      {
        id: 1,
        month: 6,
        avgCelcius: 10
      },
      {
        id: 1,
        month: 7,
        avgCelcius: 20
      },
      {
        id: 1,
        month: 8,
        avgCelcius: 25
      },
      {
        id: 1,
        month: 9,
        avgCelcius: 7
      },
      {
        id: 1,
        month: 10,
        avgCelcius: 4
      },
      {
        id: 1,
        month: 11,
        avgCelcius: -3
      },
      {
        id: 1,
        month: 12,
        avgCelcius: -12
      },
      { id: 2,
        month: 1,
        avgCelcius: -3
      },
      { id: 2,
        month: 2,
        avgCelcius: 5
      },
      { id: 2,
        month: 3,
        avgCelcius: 10
      },
      { id: 2,
        month: 4,
        avgCelcius: 12
      },
      { id: 2,
        month: 5,
        avgCelcius: 15
      },
      { id: 2,
        month: 6,
        avgCelcius: 20
      },
      { id: 2,
        month: 7,
        avgCelcius: 26
      },
      { id: 2,
        month: 8,
        avgCelcius: 28
      },
      { id: 2,
        month: 9,
        avgCelcius: 10
      },
      { id: 2,
        month: 10,
        avgCelcius: 7
      },
      { id: 2,
        month: 11,
        avgCelcius: -2
      },
      { id: 2,
        month: 12,
        avgCelcius: -5
      },
      { id: 3,
        month: 1,
        avgCelcius: 15
      },
      { id: 3,
        month: 2,
        avgCelcius: 18
      },
      { id: 3,
        month: 3,
        avgCelcius: 19
      },
      { id: 3,
        month: 4,
        avgCelcius: 20
      },
      { id: 3,
        month: 5,
        avgCelcius: 25
      },
      { id: 3,
        month: 6,
        avgCelcius: 25
      },
      { id: 3,
        month: 7,
        avgCelcius: 30
      },
      { id: 3,
        month: 8,
        avgCelcius: 34
      },
      { id: 3,
        month: 9,
        avgCelcius: 25
      },
      { id: 3,
        month: 10,
        avgCelcius: 19
      },
      { id: 3,
        month: 11,
        avgCelcius: 17
      },
      { id: 3,
        month: 12,
        avgCelcius: 17
      },
      { id: 4,
        month: 1,
        avgCelcius: -30
      },
      { id: 4,
        month: 2,
        avgCelcius: -32
      },
      { id: 4,
        month: 3,
        avgCelcius: -20
      },
      { id: 4,
        month: 4,
        avgCelcius: -18
      },
      { id: 4,
        month: 5,
        avgCelcius: -10
      },
      { id: 4,
        month: 6,
        avgCelcius: -10
      },
      { id: 4,
        month: 7,
        avgCelcius: -5
      },
      { id: 4,
        month: 8,
        avgCelcius: -4
      },
      { id: 4,
        month: 9,
        avgCelcius: -8
      },
      { id: 4,
        month: 10,
        avgCelcius: -15
      },
      { id: 4,
        month: 11,
        avgCelcius: -23
      },
      { id: 4,
        month: 12,
        avgCelcius: -28
      }
    ];
    return { months, seasons, cities, temps };
  }
}