import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { PROFILE_ID_REGEX, limiter } from 'utils.ts';
import { replicateFacebookRequest } from 'services/facebookService.ts';
import { errorMiddleware } from 'middlewares/errorMiddleware.ts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(limiter);

app.get('/profile/:profileId', async (req: Request, res: Response, next: NextFunction) => {
  const profileId = req.params.profileId;
  if (!PROFILE_ID_REGEX.test(profileId)) {
    res.status(400).json({ error: 'Invalid profile ID. Profile ID must be numeric.' });
    return;
  }

  try {
    const fbResponse = await replicateFacebookRequest(profileId);

    res.json(fbResponse);
  } catch (error) {
    next(error);
  }
}, errorMiddleware);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
