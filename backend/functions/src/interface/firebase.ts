export interface Challenge {
  idx: string;
  title: string;
  memo: string;
  days: number;
  successCount: number;
  lastSuccessDate: string;
  result: "success" | "progress" | "fail";
  isClicked: boolean;
}
