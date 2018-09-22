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
    const temps = [
      {
        id: 1,
        range: {
          low: -50,
          high: 50
        }
      }
    ];

    const humidity = [
      {
        id: 1,
        range: {
          low: 0,
          high: 100
        }
      }
    ];

    const cities = [
      {
        id: 1,
        name: "Toronto"
      },
      {
        id: 2,
        name: "Tokyo"
      },
      {
        id: 3,
        name: "Los Angeles"
      },
      {
        id: 4,
        name: "Alyeska"
      }
    ];

    const cityTemps = [
      {
        cityId: 1,
        month: 1,
        avgCelcius: -10,
        avgHumidity: 80
      },
      {
        cityId: 1,
        month: 2,
        avgCelcius: -18,
        avgHumidity: 80
      },
      {
        cityId: 1,
        month: 3,
        avgCelcius: -8,
        avgHumidity: 81
      },
      {
        cityId: 1,
        month: 4,
        avgCelcius: -3,
        avgHumidity: 79
      },
      {
        cityId: 1,
        month: 5,
        avgCelcius: 5,
        avgHumidity: 80
      },
      {
        cityId: 1,
        month: 6,
        avgCelcius: 10,
        avgHumidity: 85
      },
      {
        cityId: 1,
        month: 7,
        avgCelcius: 20,
        avgHumidity: 90
      },
      {
        cityId: 1,
        month: 8,
        avgCelcius: 25,
        avgHumidity: 95
      },
      {
        cityId: 1,
        month: 9,
        avgCelcius: 7,
        avgHumidity: 83
      },
      {
        cityId: 1,
        month: 10,
        avgCelcius: 4,
        avgHumidity: 80
      },
      {
        cityId: 1,
        month: 11,
        avgCelcius: -3,
        avgHumidity: 79
      },
      {
        cityId: 1,
        month: 12,
        avgCelcius: -12,
        avgHumidity: 82
      },
      {
        cityId: 2,
        month: 1,
        avgCelcius: -3,
        avgHumidity: 45
      },
      {
        cityId: 2,
        month: 2,
        avgCelcius: 5,
        avgHumidity: 47
      },
      {
        cityId: 2,
        month: 3,
        avgCelcius: 10,
        avgHumidity: 50
      },
      {
        cityId: 2,
        month: 4,
        avgCelcius: 12,
        avgHumidity: 52
      },
      {
        cityId: 2,
        month: 5,
        avgCelcius: 15,
        avgHumidity: 60
      },
      {
        cityId: 2,
        month: 6,
        avgCelcius: 20,
        avgHumidity: 76
      },
      {
        cityId: 2,
        month: 7,
        avgCelcius: 26,
        avgHumidity: 79
      },
      {
        cityId: 2,
        month: 8,
        avgCelcius: 28,
        avgHumidity: 65
      },
      {
        cityId: 2,
        month: 9,
        avgCelcius: 10,
        avgHumidity: 61
      },
      {
        cityId: 2,
        month: 10,
        avgCelcius: 7,
avgHumidity: 55       },
      {
        cityId: 2,
        month: 11,
        avgCelcius: -2,
        avgHumidity: 52
      },
      {
        cityId: 2,
        month: 12,
        avgCelcius: -5,
        avgHumidity: 50
      },
      {
        cityId: 3,
        month: 1,
        avgCelcius: 15,
        avgHumidity:  5     
      },
      {
        cityId: 3,
        month: 2,
        avgCelcius: 18,
        avgHumidity:  6     
      },
      {
        cityId: 3,
        month: 3,
        avgCelcius: 19,
        avgHumidity:  6     
      },
      {
        cityId: 3,
        month: 4,
        avgCelcius: 20,
        avgHumidity:  10     
      },
      {
        cityId: 3,
        month: 5,
        avgCelcius: 25,
        avgHumidity: 25      
      },
      {
        cityId: 3,
        month: 6,
        avgCelcius: 25,
        avgHumidity:  70     
      },
      {
        cityId: 3,
        month: 7,
        avgCelcius: 30,
        avgHumidity:   75    
      },
      {
        cityId: 3,
        month: 8,
        avgCelcius: 34,
        avgHumidity:   90    
      },
      {
        cityId: 3,
        month: 9,
        avgCelcius: 25,
        avgHumidity:  90     
      },
      {
        cityId: 3,
        month: 10,
        avgCelcius: 19,
        avgHumidity:   70    
      },
      {
        cityId: 3,
        month: 11,
        avgCelcius: 17,
        avgHumidity: 72      },
      {
        cityId: 3,
        month: 12,
        avgCelcius: 17,
        avgHumidity:  10     },
      {
        cityId: 4,
        month: 1,
        avgCelcius: -30,
        avgHumidity: 70
   
   },
      {
        cityId: 4,
        month: 2,
        avgCelcius: -32,
        avgHumidity: 65
      },
      {
        cityId: 4,
        month: 3,
        avgCelcius: -20,
        avgHumidity: 50
      },
      {
        cityId: 4,
        month: 4,
        avgCelcius: -18,
        avgHumidity: 53
      },
      {
        cityId: 4,
        month: 5,
        avgCelcius: -10,
        avgHumidity: 50
      },
      {
        cityId: 4,
        month: 6,
        avgCelcius: -10,
        avgHumidity: 54
      },
      {
        cityId: 4,
        month: 7,
        avgCelcius: -5,
        avgHumidity: 50      
      },
      {
        cityId: 4,
        month: 8,
        avgCelcius: -4,
        avgHumidity: 60      
      },
      {
        cityId: 4,
        month: 9,
        avgCelcius: -8,
        avgHumidity: 68      
      },
      {
        cityId: 4,
        month: 10,
        avgCelcius: -15,
        avgHumidity: 72
      },
      {
        cityId: 4,
        month: 11,
        avgCelcius: -23,
        avgHumidity: 75
      },
      {
        cityId: 4,
        month: 12,
        avgCelcius: -28,
        avgHumidity: 79
      }
    ];
    return { months, temps, humidity, cities, cityTemps };
  }
}