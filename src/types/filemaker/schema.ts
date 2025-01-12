// Generated FileMaker Schema Types
export type FieldType = string | number | null;

export interface BaseFieldData {
  [fieldName: string]: FieldType;
}

export interface BasePortalData {
  [portalName: string]: Array<BaseFieldData>;
}

export type FMDatabase = {
  Table: {
    users: {
      read: {
        fieldData: {
          name: string | null;
          email: string | null;
          pass: string | null;
          role: string | null;
          pk: string;
          id: string | null;
        };
      };
      create: {
        fieldData: {
          name: string | null;
          email: string | null;
          pass: string | null;
          role: string | null;
          pk: string;
          id: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          name?: string | null;
          email?: string | null;
          pass?: string | null;
          role?: string | null;
          pk?: string;
          id?: string | null;
        }>;
      };
    };

    blog: {
      read: {
        fieldData: {
          title: string | null;
          content: string | null;
          image: string | null;
          creator_pk: string | null;
          id: number | null;
        };
      };
      create: {
        fieldData: {
          title: string | null;
          content: string | null;
          image: string | null;
          creator_pk: string | null;
          id: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          title?: string | null;
          content?: string | null;
          image?: string | null;
          creator_pk?: string | null;
          id?: number | null;
        }>;
      };
    };
  };
  Script: {
    script: [
      { id: 1; name: 'アカウント制御' },
      { id: 2; name: '_アカウント登録' },
      { id: 3; name: '_アカウントパスワード更新' },
      { id: 6; name: '_アカウント有効化' },
      { id: 4; name: '_アカウント削除' },
      { id: 23; name: '--' },
      { id: 18; name: 'server_pdf' },
      { id: 22; name: 'pdf' },
      { id: 21; name: 'pdf_dairy_entry' },
      { id: 17; name: 'pdf_dairy_hansyoku' },
      { id: 19; name: 'excel_dairy_hansyoku' },
      { id: 20; name: 'server_excel' },
      { id: 24; name: '新規スクリプト' },
      { id: 25; name: 'all_update' }
    ];
  };
};
