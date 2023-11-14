import FeedbackModel from "../model/FeedbackModel";
import { requestAdmin } from "./Request";

export async function getAllFeedback(): Promise<FeedbackModel[]> {
   const endpoint = "http://localhost:8080/feedbacks?sort=idFeedback,desc";
   const response = await requestAdmin(endpoint);

   const feedbacks: FeedbackModel[] = await response._embedded.feedbackses.map((feedbackData: any) => ({
      ...feedbackData,
      user: feedbackData._embedded.user.username,
   }))

   return feedbacks;
}