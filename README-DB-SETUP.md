# Database Connection Setup and Troubleshooting

This guide provides instructions for setting up and troubleshooting your database connection for the EwaaHome application.

## Connection Options

There are two ways to connect to a database for this project:

### Option 1: Cloud MongoDB Atlas (Currently Used)

The project is currently configured to use MongoDB Atlas cloud database with the following connection:

```
DATABASE_URL="mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa"
```

This connection is already working and has been verified.

### Option 2: Local MongoDB (Alternative for Development)

If you want to use a local MongoDB instance instead:

1. Install MongoDB locally:
   - Windows: Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Mac: Use `brew install mongodb-community`
   - Linux: Use your package manager, e.g., `sudo apt install mongodb`

2. Start MongoDB:
   - Windows: Service should start automatically or use MongoDB Compass
   - Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

3. Update your `.env` file:
   ```
   DATABASE_URL="mongodb://localhost:27017/ewaahome"
   ```

## Testing Database Connection

Run one of the provided test scripts:

```
npm run db:test        # Tests using Prisma client
npm run db:mongo-test  # Tests using MongoDB driver directly
```

or view the database in Prisma Studio:

```
npm run prisma:studio  # Opens Prisma Studio interface at http://localhost:5555
```

## Current Status

✅ **Database Connection**: Working correctly
✅ **Data Model**: Schema is properly defined
✅ **Authentication**: Working with the database

## Troubleshooting Connection Issues

### Common Issues and Solutions

#### DNS Resolution Failures

Error: `getaddrinfo ENOTFOUND <hostname>`

Solutions:
- Check internet connection
- Verify the MongoDB Atlas cluster URL is correct
- Try using a different DNS server
- Check if your firewall is blocking outbound connections

#### Authentication Failures

Error: `Authentication failed`

Solutions:
- Check username/password in connection string
- Verify the database user has proper permissions
- Check if the user is configured for the correct authentication database

#### Connection Timeout

Error: `connection timed out` or `server selection timeout`

Solutions:
- Check network connectivity
- Check firewall settings
- Verify MongoDB Atlas is not having an outage
- Try connecting from a different network

#### Port Already in Use

Error: `address already in use` (when starting the app)

Solution:
- The development server now runs on port 3007 instead of 3006 to avoid conflicts
- Access the site at http://localhost:3007
- If you need to change ports again, edit the "dev" script in package.json

## Need Further Help?

If you continue to experience connection issues:

1. Check the MongoDB Atlas status page: [https://status.mongodb.com/](https://status.mongodb.com/)
2. Verify your network configuration allows outbound connections to MongoDB Atlas
3. Try connecting via MongoDB Compass to isolate if it's a code or connection issue
4. Contact your network administrator if you're behind a corporate firewall 