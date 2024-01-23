# Interview Assignment: Recreate Facebook Request with Express

Your primary goal is to replicate a specific Facebook request using an Express server. The details and flow of the task are outlined below.

## Task Flow

1. **Objective:** Your first task is to recreate a specific Facebook request and embed it within an Express server.
2. **Resources:** We will provide you with:
   - An `.har` network file.
   - An Express boilerplate to kickstart your implementation.
   - [got documentation](https://github.com/sindresorhus/got)
3. **Network File Examination:** You must read the provided .har network file to find the request you need to replicate.
   - **Hint:** Look for a request sent to the `/api/graphql` endpoint that includes the string “ProfileCometHeaderQuery” in the HTTP payload.
   <!-- 17620 -->
4. **Replicate the Request:** Craft a function to replicate the request. This function should accept a variable profile ID.
5. **Endpoint Implementation:** Develop an endpoint in your Express server:
   - The endpoint should take in a profile ID parameter.
   - It should utilize the previously crafted request function to return the response from Facebook.
   - You should handle the following:
     1. Validate the profile ID parameter and if invalid, send a suitable error response.
     2. Implement correct retry mechanisms.
     3. If retries fail, handle those failures gracefully and send a corresponding error response.
6. **Response Format:** Ensure that the server returns responses in JSON format.
7. **Server Robustness:** It's paramount that your server is robust, meaning it should not crash under any circumstances. Ensure error handling is comprehensive.
8. **Code Separation:** Your code should be modular and well-separated.

## Important Notes

- **Code Quality:** Prioritize code readability and robustness. Your code will be evaluated based on its clarity, structure, and resilience.
- **Communication:** Don't hesitate to ask questions. Being communicative and clear about your doubts or the choices you make is vital. If you're uncertain about something or need further clarity, reach out.

---

We wish you the best with the assignment! We're excited to see your solution. Remember, the journey and your approach are as valuable as the final product. Happy coding!


## Running the project
- pnpm run dev