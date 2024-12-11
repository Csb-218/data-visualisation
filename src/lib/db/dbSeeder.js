// eslint-disable-next-line @typescript-eslint/no-require-imports
const sqlite3 = require('sqlite3').verbose();
// eslint-disable-next-line @typescript-eslint/no-require-imports
const csv = require('csv-parser')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')


let count = 0;
function  convertDateFormat(dateString) {
  // Split the input string by '/'
  const [day, month, year] = dateString.split('/');

  // Return the rearranged date string in 'yyyy-mm-dd' format
  return `${year}-${month}-${day}`;
}


// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


db.serialize(() => {

  db.run(
    `CREATE TABLE IF NOT EXISTS peoplestats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day DATE,
    age TEXT,
    gender TEXT,
    A INTEGER ,
    B INTEGER ,
    C INTEGER ,
    D INTEGER ,
    E INTEGER ,
    F INTEGER 
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('peoplestats table created or already exists.');
      }
    }
  );

  const stmt = db.prepare(
    'INSERT INTO peoplestats (day, age, gender, A, B, C, D ,E, F) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );

  fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {

    let sqlDate = convertDateFormat(data?.Day)
    // console.log(sqlDate)
    stmt.run(
      sqlDate,
      data.Age,
      data.Gender,
      data.A,
      data.B,
      data.C,
      data.D,
      data.E,
      data.F
    );
    
    count++;

  })
  .on('end', () => {
    console.log(count+' records pushed data into database');
    stmt.finalize();
  });


  console.log('Inserted 104 peopleStats into the database.');


  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });

});
