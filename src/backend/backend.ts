import express, { Request, Response } from 'express';
import { Server, ic, query } from 'azle';
import { HttpResponse, HttpTransformArgs } from 'azle/canisters/management';
import { cropsDb } from './db';
import moment from 'moment-timezone';


type History = {
    quantity: number;
    price: number;
    date: string;
}

export type Crop = {
    name: string;
    quantity: number;
    price: number;
    province: string;
    type: string;
    date: string;
    history: History[];
}




  export default Server(
    () => {
        const app = express();
        app.use(express.json());

        // POST /add-crop
        app.post('/add-crops', (req: Request, res: Response) => {
            const newCrops: Crop[] = req.body;
        
            if (!Array.isArray(newCrops)) {
                return res.status(400).json({ message: 'Invalid input: expected an array of crops.' });
            }
        
            // Automatically set the date to the current time in Philippine time
            const currentDate = moment().tz('Asia/Manila').format(); // Current date in ISO 8601 format
        
            // Replace old crops and update history or add new crops
            newCrops.forEach((newCrop) => {
                const existingCropIndex = cropsDb.findIndex(crop => crop.name === newCrop.name);
        
                if (existingCropIndex !== -1) {
                    // Crop exists, update it and append to history
                    cropsDb[existingCropIndex] = {
                        ...newCrop,
                        date: currentDate,
                        history: [
                            ...cropsDb[existingCropIndex].history,
                            {
                                quantity: newCrop.quantity,
                                price: newCrop.price,
                                date: currentDate,
                            },
                        ],
                    };
                } else {
                    // Crop doesn't exist, add it as a new entry
                    cropsDb.push({
                        ...newCrop,
                        date: currentDate,
                        history: [
                            {
                                quantity: newCrop.quantity,
                                price: newCrop.price,
                                date: currentDate,
                            },
                        ],
                    });
                }
            });
        
            return res.status(201).json(cropsDb);
        });
        app.get('/crops', (req: Request, res: Response) => {
            return res.status(200).json(cropsDb);
        })
        app.get('/crops/location', (req: Request, res: Response) => {
            // Initialize an object to store total quantities by province
            const provinceTotals: { [key: string]: number } = {};
        
            // Iterate over the cropsDb and sum the latest quantity per province
            cropsDb.forEach(crop => {
                // Add the latest crop quantity to the province total
                if (provinceTotals[crop.province]) {
                    provinceTotals[crop.province] += crop.quantity;
                } else {
                    provinceTotals[crop.province] = crop.quantity;
                }
            });
        
            // Convert the provinceTotals object into the expected mapData format
            const mapData = Object.keys(provinceTotals).map(province => ({
                province,
                total: provinceTotals[province]
            }));
        
            return res.status(200).json(mapData);
        });
          app.get('/crops/price/:province', (req: Request, res: Response) => {
            try {
              const province = req.params.province;
          
              // Filter crops by province
              const filteredCrops = cropsDb.filter(crop => crop.province === province);
          
              if (filteredCrops.length === 0) {
                return res.status(404).json({ error: 'No crops found for the specified province' });
              }
          
              // Initialize an object to store the total price per month
              const priceByMonth: { [key: string]: number } = {
                JAN: 0,
                FEB: 0,
                MAR: 0,
                APR: 0,
                MAY: 0,
                JUN: 0,
                JUL: 0,
                AUG: 0,
                SEP: 0,
                OCT: 0,
                NOV: 0,
                DEC: 0,
              };
          
              // Iterate over the filtered crops and their history to sum the prices by month
              filteredCrops.forEach(crop => {
                const mainMonth = moment(crop.date).format('MMM').toUpperCase();
                const mainMonthNumber = moment(crop.date).month(); // Get month as a number (0-11)
                if (mainMonthNumber >= 0 && mainMonthNumber <= 11) { // January is 0, October is 9
                  priceByMonth[mainMonth] += crop.price;
                }
          
                crop.history.forEach(history => {
                  const historyMonth = moment(history.date).format('MMM').toUpperCase();
                  const historyMonthNumber = moment(history.date).month(); // Get month as a number (0-11)
                  if (historyMonthNumber >= 0 && historyMonthNumber <= 11) { // January is 0, October is 9
                    priceByMonth[historyMonth] += history.price;
                  }
                });
              });
          
              // Transform the priceByMonth object into the desired output format
              const result = Object.keys(priceByMonth).map(month => ({
                name: month,
                price: priceByMonth[month],
              }));
          
              res.json(result);
            } catch (error) {
              console.error('Error processing request:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
          app.get('/crops/stock/:province', (req: Request, res: Response) => {
            try {
              const province = req.params.province;
          
              // Filter stocks by province
              const filteredStocks = cropsDb.filter(stock => stock.province === province);
          
              if (filteredStocks.length === 0) {
                return res.status(404).json({ error: 'No stocks found for the specified province' });
              }
          
              // Initialize an object to store the total quantity per month
              const quantityByMonth: { [key: string]: number } = {
                JAN: 0,
                FEB: 0,
                MAR: 0,
                APR: 0,
                MAY: 0,
                JUN: 0,
                JUL: 0,
                AUG: 0,
                SEP: 0,
                OCT: 0,
                NOV: 0,
                DEC: 0,
              };
          
              // Iterate over the filtered stocks and their history to sum the quantity by month
              filteredStocks.forEach(stock => {
                const mainMonth = moment(stock.date).format('MMM').toUpperCase();
                const mainMonthNumber = moment(stock.date).month(); // Get month as a number (0-11)
                if (mainMonthNumber >= 0 && mainMonthNumber <= 11) { // January is 0, December is 11
                  quantityByMonth[mainMonth] += stock.quantity;
                }
          
                stock.history.forEach(history => {
                  const historyMonth = moment(history.date).format('MMM').toUpperCase();
                  const historyMonthNumber = moment(history.date).month(); // Get month as a number (0-11)
                  if (historyMonthNumber >= 0 && historyMonthNumber <= 11) { // January is 0, December is 11
                    quantityByMonth[historyMonth] += history.quantity;
                  }
                });
              });
          
              // Transform the quantityByMonth object into the desired output format
              const result = Object.keys(quantityByMonth).map(month => ({
                name: month,
                quantity: quantityByMonth[month],
              }));
          
              res.json(result);
            } catch (error) {
              console.error('Error processing request:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
  
        app.post('/crops-map', (req: Request, res: Response) => {
            try {
            const { province, month } = req.body;
        
            if (!month) {
                return res.status(400).json({ error: 'Month query parameter is required' });
            }
        
            console.log(`Filtering crops for province: ${province} and month: ${month}`);
        
            // Filter crops by province
            const filteredCrops = cropsDb.filter(crop => crop.province === province);
        
            // Filter by month
            const filteredByMonth = filteredCrops.flatMap(crop => {
                const mainMonth = moment(crop.date).format('MMMM').toUpperCase();
                const historyMatches = crop.history.filter(history => 
                moment(history.date).format('MMMM').toUpperCase() === month.toUpperCase()
                );
        
                const mainMatch = mainMonth === month.toUpperCase() ? [{ ...crop, isHistory: false }] : [];
                const historyMatchesWithFlag = historyMatches.map(history => ({ ...history, name: crop.name, isHistory: true }));
        
                return [...mainMatch, ...historyMatchesWithFlag];
            });
        
            console.log(`Filtered crops by month: ${JSON.stringify(filteredByMonth)}`);
        
            if (filteredByMonth.length === 0) {
                return res.status(404).json({ error: 'No crops found for the specified province and month' });
            }
        
            // Initialize an object to store the total quantity and price per crop name
            const cropsByName: { [key: string]: { quantity: number; price: number } } = {};
        
            // Iterate over the filtered crops and sum the quantities and prices by name
            filteredByMonth.forEach(item => {
                const cropName = item.name;
                if (!cropsByName[cropName]) {
                cropsByName[cropName] = { quantity: 0, price: 0 };
                }
                cropsByName[cropName].quantity += item.quantity;
                cropsByName[cropName].price += item.price;
            });
        
            console.log(`Crops by name: ${JSON.stringify(cropsByName)}`);
        
            // Transform the cropsByName object into the desired output format
            const result = Object.keys(cropsByName).map(name => ({
                name,
                quantity: cropsByName[name].quantity,
                price: cropsByName[name].price,
            }));
        
            console.log(`Result: ${JSON.stringify(result)}`);
        
            res.json(result);
            } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.use(express.static('/dist'));

        return app.listen();
    },
    // Candid section
    {
        // The transformation function for the HTTP outcall responses.
        // Required to reach consensus among different results the nodes might get.
        // Only if they all get the same response, the result is returned, so make sure
        // your HTTP requests are idempotent and don't depend e.g. on the time.
        transform: query([HttpTransformArgs], HttpResponse, (args) => {
            return {
                ...args.response,
                headers: []
            };
        })
    }
);