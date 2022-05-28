import {MessageService} from "primeng/api";

export const addToMessageService = (severity?: string, summary?: string, detail?: string, messageService?: MessageService) => {
  if (messageService) {
    messageService.add({
      severity: severity,
      detail: detail,
      summary: summary,
    });
  } else {
    throw Error("Define the message service something");
  }
}
