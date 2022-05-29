import {MessageService} from "primeng/api";

export const addToMessageService = (messageService: MessageService, severity?: string, summary?: string, detail?: string) => {
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
