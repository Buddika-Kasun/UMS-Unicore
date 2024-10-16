import { toast } from "react-toastify";

export default function handleMiddlewareMsg(message) {
  switch (message) {
    case "unauthorized":
      toast.error("You do not have access to that page.");
      break;
    case "unauthenticated":
      toast.info("Please login to access.");
      break;
    default:
      // Handle other cases or do nothing
      break;
  }
}
