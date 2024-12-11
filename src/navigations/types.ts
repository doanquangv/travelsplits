// client/travelsplits/src/navigation/types.ts

export type RootStackParamList = {
    ScheduleTab: { eventId: string;   }; // Thêm eventId nếu ScheduleTab nhận
    AddNewSchedule: { 
      eventId: string; 
      // fetchSchedules: () => Promise<void>; 
    };
    ScheduleDetailScreen: { 
      eventId: string;
      scheduleId: string; 
    };
    EditScheduleScreen: { 
      eventId: string;
      scheduleId: string; 
    };
    EventDetail: { item: any };
    main: undefined;
    TransactionsTab: undefined; // Màn hình không có tham số

    ExpenseDetailScreen:{eventId:string,expenseId:string}
    SelectLocation: undefined; // Nếu không nhận params
    EditExpenseScreen: {
      eventId: string;
      expenseId: string;
      
    };
    EditEventScreen:{
      eventId:string;
    }
    // Thêm các màn hình khác nếu cần
  };
  