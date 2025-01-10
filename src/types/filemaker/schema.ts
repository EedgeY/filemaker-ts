// Generated FileMaker Schema Types
export type FieldType = string | number;

export interface FieldData {
  [fieldName: string]: FieldType;
}

export interface PortalData {
  [portalName: string]: FieldData;
}

export interface LayoutSchema {
  fieldData: FieldData;
  portalData: PortalData;
}

export interface FileMakerBaseResponse {
  messages: Array<{
    code: string;
    message: string;
  }>;
}

export interface FileMakerDataResponse<T = Record<string, string | number>>
  extends FileMakerBaseResponse {
  response: {
    dataInfo?: {
      database: string;
      layout: string;
      table: string;
      totalRecordCount: number;
      foundCount: number;
      returnedCount: number;
    };
    data?: Array<{
      fieldData: T;
      portalData?: Record<string, T>;
      recordId: string;
      modId: string;
    }>;
    token?: string;
  };
}

export interface FileMakerModifyResponse extends FileMakerBaseResponse {
  response: {
    recordId?: string;
    modId?: string;
    scriptResult?: string;
    scriptError?: string;
  };
}

export interface Database {
  Table: {
    [layoutName: string]: {
      row: { fields: Record<string, string> };
      insert: { fields: Record<string, string> };
      update: { fields: Record<string, string> };
    };
  };
  Script: {
    script: Array<{ name: string }>;
  };
}

export type FMScriptName = Database['Script']['script'][number]['name'];
export type FMLayoutName = keyof Database['Table'];
export type FMFieldName =
  keyof Database['Table'][FMLayoutName]['row']['fields'];
export type FMInsertFieldName =
  keyof Database['Table'][FMLayoutName]['insert']['fields'];
export type FMUpdateFieldName =
  keyof Database['Table'][FMLayoutName]['update']['fields'];

export type FMDatabase = {
  Table: {
    users: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          furikana: string | null;
          hidden: number | null;
          pass: string | null;
          role: string | null;
          farm_id: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          furikana?: string;
          hidden?: number;
          pass?: string;
          role?: string;
          farm_id?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          furikana?: string;
          hidden?: number;
          pass?: string;
          role?: string;
          farm_id?: number;
        };
      };
    };
    farm: {
      row: {
        fields: {
          _pk: string;
          farm_id: number | null;
          farm_name: string | null;
          owner_name: string | null;
          address: string | null;
          post_code: string | null;
          tel: string | null;
          FAX: string | null;
          mail: string | null;
          farm_code: string | null;
          pregnancy_test_days: number | null;
          pregnancy_days: number | null;
          billing_name: string | null;
          billing_address: string | null;
          billing_post_code: string | null;
          billing_tel: string | null;
          billing_fax: string | null;
          billing_mail: string | null;
          tax: number | null;
          invoice_code: string | null;
          calf_age_days: number | null;
          cattle_age_days: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          farm_id?: number;
          farm_name?: string;
          owner_name?: string;
          address?: string;
          post_code?: string;
          tel?: string;
          FAX?: string;
          mail?: string;
          farm_code?: string;
          pregnancy_test_days?: number;
          pregnancy_days?: number;
          billing_name?: string;
          billing_address?: string;
          billing_post_code?: string;
          billing_tel?: string;
          billing_fax?: string;
          billing_mail?: string;
          tax?: number;
          invoice_code?: string;
          calf_age_days?: number;
          cattle_age_days?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          farm_id?: number;
          farm_name?: string;
          owner_name?: string;
          address?: string;
          post_code?: string;
          tel?: string;
          FAX?: string;
          mail?: string;
          farm_code?: string;
          pregnancy_test_days?: number;
          pregnancy_days?: number;
          billing_name?: string;
          billing_address?: string;
          billing_post_code?: string;
          billing_tel?: string;
          billing_fax?: string;
          billing_mail?: string;
          tax?: number;
          invoice_code?: string;
          calf_age_days?: number;
          cattle_age_days?: number;
        };
      };
    };
    owner: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number;
          summer_price: number | null;
          修正情報タイムスタンプ: string;
          count: number;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          summer_price?: number;
          修正情報タイムスタンプ: string;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          summer_price?: number;
          修正情報タイムスタンプ?: string;
        };
      };
    };
    staff_master: {
      row: {
        fields: {
          pk: string;
          id: number | null;
          name: string | null;
          furikana: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          id?: number;
          name?: string;
          furikana?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          pk?: string;
          id?: number;
          name?: string;
          furikana?: string;
          hidden?: number;
        };
      };
    };
    herd_cattle_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
    };
    pen_master: {
      row: {
        fields: {
          id: number | null;
          _pk: string;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          id?: number;
          _pk: string;
          name?: string;
          delete_flag?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          id?: number;
          _pk?: string;
          name?: string;
          delete_flag?: number;
          hidden?: number;
        };
      };
    };
    variety_master: {
      row: {
        fields: {
          pk: string;
          id: number | null;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          id?: number;
          name?: string;
          delete_flag?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          pk?: string;
          id?: number;
          name?: string;
          delete_flag?: number;
          hidden?: number;
        };
      };
    };
    breeding_classification_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
          delete_flag: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
          delete_flag?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
          delete_flag?: number;
        };
      };
    };
    semen_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
          semen_code: string | null;
          delete_flag: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
          semen_code?: string;
          delete_flag?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
          semen_code?: string;
          delete_flag?: number;
        };
      };
    };
    embryo_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
    };
    estrus_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
    };
    reproductive_treatment_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
    };
    egg_inspection_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          remark: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          remark?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          remark?: string;
          hidden?: number;
        };
      };
    };
    veterinarian_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
    };
    treatment_crassification_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
    };
    disease_name_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          type?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          type?: string;
          hidden?: number;
        };
      };
    };
    symptoms_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          hidden?: number;
        };
      };
    };
    medicine_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          price?: number;
          hidden?: number;
        };
      };
    };
    vaccine_master: {
      row: {
        fields: {
          pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          id?: number;
          name?: string;
          type?: string;
          price?: number;
          hidden?: number;
        };
      };
      update: {
        fields: {
          pk?: string;
          id?: number;
          name?: string;
          type?: string;
          price?: number;
          hidden?: number;
        };
      };
    };
    special_payment_master: {
      row: {
        fields: {
          _pk: string;
          id: number | null;
          name: string | null;
          classification: string | null;
          delete_flag: number | null;
        };
      };
      insert: {
        fields: {
          _pk: string;
          id?: number;
          name?: string;
          classification?: string;
          delete_flag?: number;
        };
      };
      update: {
        fields: {
          _pk?: string;
          id?: number;
          name?: string;
          classification?: string;
          delete_flag?: number;
        };
      };
    };
    entry: {
      row: {
        fields: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          date: string | null;
          type: string | null;
          remark: string | null;
          weight: string | null;
          height: string | null;
          cow_code: string | null;
          _fk_owner_pk: string | null;
          owner_name: string | null;
          label: string | null;
          birth_date: string | null;
          sex: string | null;
          in_day: string | null;
          out_day: string | null;
          destination_id: number | null;
          variety: string | null;
          desired_species_id_1: number | null;
          desired_species_id_2: number | null;
          desired_species_id_3: number | null;
          enrollment_check: number | null;
          state: string | null;
          in_count: number;
          estrus_cycle: string;
          expected_pregnancy_test_date: string;
          vaccine_program_id: string | null;
          Insemination_start_date: string | null;
          repeat_type: number | null;
          fk: string | null;
          add_date: string | null;
          title: string | null;
          content: string | null;
          tag: string | null;
          scheduled_date: string | null;
          start_period: string | null;
          end_period: string | null;
          repeat_interval: number | null;
          repeat_end_date: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          type?: string;
          remark?: string;
          weight?: string;
          height?: string;
          cow_code?: string;
          _fk_owner_pk?: string;
          owner_name?: string;
          label?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
          destination_id?: number;
          variety?: string;
          desired_species_id_1?: number;
          desired_species_id_2?: number;
          desired_species_id_3?: number;
          enrollment_check?: number;
          state?: string;
          vaccine_program_id?: string;
          Insemination_start_date?: string;
          repeat_type?: number;
          fk?: string;
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          start_period?: string;
          end_period?: string;
          repeat_interval?: number;
          repeat_end_date?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          type?: string;
          remark?: string;
          weight?: string;
          height?: string;
          cow_code?: string;
          _fk_owner_pk?: string;
          owner_name?: string;
          label?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
          destination_id?: number;
          variety?: string;
          desired_species_id_1?: number;
          desired_species_id_2?: number;
          desired_species_id_3?: number;
          enrollment_check?: number;
          state?: string;
          vaccine_program_id?: string;
          Insemination_start_date?: string;
          repeat_type?: number;
          fk?: string;
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          start_period?: string;
          end_period?: string;
          repeat_interval?: number;
          repeat_end_date?: string;
        };
      };
    };
    vaccine: {
      row: {
        fields: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          '━━━━━━━━ 履歴': string | null;
          date: string | null;
          type: number;
          content_id: number | null;
          content: string | null;
          price: number | null;
          quantity: number | null;
          remark: string | null;
          作成情報タイムスタンプ: string;
          作成者: string;
          修正情報タイムスタンプ: string;
          修正者: string;
          veterinarian_id: number | null;
          veterinarian_name: string | null;
          manager: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          '━━━━━━━━ 履歴'?: string;
          date?: string;
          content_id?: number;
          content?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          作成情報タイムスタンプ: string;
          作成者: string;
          修正情報タイムスタンプ: string;
          修正者: string;
          veterinarian_id?: number;
          veterinarian_name?: string;
          manager?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          '━━━━━━━━ 履歴'?: string;
          date?: string;
          content_id?: number;
          content?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          作成情報タイムスタンプ?: string;
          作成者?: string;
          修正情報タイムスタンプ?: string;
          修正者?: string;
          veterinarian_id?: number;
          veterinarian_name?: string;
          manager?: string;
        };
      };
    };
    treatment: {
      row: {
        fields: {
          pk: string;
          _fk_pk_cow: string | null;
          cow_number: string | null;
          owner_id: number | null;
          owner_name: string;
          cow_id: number | null;
          date: string | null;
          body_temperature: number | null;
          classification_id: number | null;
          disease_name_id: number | null;
          symptoms_id: number | null;
          treatment_content1_id: number | null;
          quantity1: number | null;
          treatment_content2_id: number | null;
          quantity2: number | null;
          treatment_content3_id: number | null;
          quantity3: number | null;
          treatment_content4_id: number | null;
          quantity4: number | null;
          veterinarian_id: number | null;
          treatment_classification: string | null;
          disease_name: string | null;
          symptoms: string | null;
          treatment_content1: string | null;
          treatment_content2: string | null;
          price2: number | null;
          treatment_content3: string | null;
          price3: number | null;
          treatment_content4: string | null;
          price4: number | null;
          reservation_date: string | null;
          veterinarian: string | null;
          manager: string | null;
          remark: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          _fk_pk_cow?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          body_temperature?: number;
          classification_id?: number;
          disease_name_id?: number;
          symptoms_id?: number;
          treatment_content1_id?: number;
          quantity1?: number;
          treatment_content2_id?: number;
          quantity2?: number;
          treatment_content3_id?: number;
          quantity3?: number;
          treatment_content4_id?: number;
          quantity4?: number;
          veterinarian_id?: number;
          treatment_classification?: string;
          disease_name?: string;
          symptoms?: string;
          treatment_content1?: string;
          treatment_content2?: string;
          price2?: number;
          treatment_content3?: string;
          price3?: number;
          treatment_content4?: string;
          price4?: number;
          reservation_date?: string;
          veterinarian?: string;
          manager?: string;
          remark?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          _fk_pk_cow?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          body_temperature?: number;
          classification_id?: number;
          disease_name_id?: number;
          symptoms_id?: number;
          treatment_content1_id?: number;
          quantity1?: number;
          treatment_content2_id?: number;
          quantity2?: number;
          treatment_content3_id?: number;
          quantity3?: number;
          treatment_content4_id?: number;
          quantity4?: number;
          veterinarian_id?: number;
          treatment_classification?: string;
          disease_name?: string;
          symptoms?: string;
          treatment_content1?: string;
          treatment_content2?: string;
          price2?: number;
          treatment_content3?: string;
          price3?: number;
          treatment_content4?: string;
          price4?: number;
          reservation_date?: string;
          veterinarian?: string;
          manager?: string;
          remark?: string;
        };
      };
    };
    breeding: {
      row: {
        fields: {
          pk: string;
          fk: string | null;
          add_date: string | null;
          title: string | null;
          content: string | null;
          tag: string | null;
          scheduled_date: string | null;
          cow_code: string | null;
          owner_id: number | null;
          _fk_cow_pk: string | null;
          classification_name: string | null;
          date: string | null;
          content_note: string | null;
          price: number | null;
          quantity: number | null;
          remark: string | null;
          reservation_date: string | null;
          manager: string | null;
          veterinarian_name: string | null;
          label: string | null;
          state: string | null;
          pregnancy_test_date: string | null;
          delivery_date: string | null;
          expected_age_of_delivery: number;
          owner_name: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          fk?: string;
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          cow_code?: string;
          owner_id?: number;
          _fk_cow_pk?: string;
          classification_name?: string;
          date?: string;
          content_note?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          reservation_date?: string;
          manager?: string;
          veterinarian_name?: string;
          label?: string;
          state?: string;
          pregnancy_test_date?: string;
          delivery_date?: string;
          owner_name?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          fk?: string;
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          cow_code?: string;
          owner_id?: number;
          _fk_cow_pk?: string;
          classification_name?: string;
          date?: string;
          content_note?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          reservation_date?: string;
          manager?: string;
          veterinarian_name?: string;
          label?: string;
          state?: string;
          pregnancy_test_date?: string;
          delivery_date?: string;
          owner_name?: string;
        };
      };
    };
    expected_pregnancy_test_date: {
      row: {
        fields: {
          expected_pregnancy_test_date: string;
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
        };
      };
      insert: {
        fields: {
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
        };
      };
      update: {
        fields: {
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
        };
      };
    };
    dashboard: {
      row: {
        fields: {
          pk: string;
          date: string | null;
          enrollment_check: number | null;
          ai: number | null;
          et: number | null;
          hatujou: number | null;
          syoshin: number | null;
          saishin: number | null;
          hansyokutiryou: number | null;
          vaccine: string | null;
          idou: string | null;
          jokaku: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          date?: string;
          enrollment_check?: number;
          ai?: number;
          et?: number;
          hatujou?: number;
          syoshin?: number;
          saishin?: number;
          hansyokutiryou?: number;
          vaccine?: string;
          idou?: string;
          jokaku?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          date?: string;
          enrollment_check?: number;
          ai?: number;
          et?: number;
          hatujou?: number;
          syoshin?: number;
          saishin?: number;
          hansyokutiryou?: number;
          vaccine?: string;
          idou?: string;
          jokaku?: string;
        };
      };
    };
    'diary-report': {
      row: {
        fields: {
          date: string | null;
          pk: string;
        };
      };
      insert: {
        fields: {
          date?: string;
          pk: string;
        };
      };
      update: {
        fields: {
          date?: string;
          pk?: string;
        };
      };
    };
    pdf_daily_hansyoku: {
      row: {
        fields: {
          manager: string | null;
          veterinarian_name: string | null;
        };
      };
      insert: {
        fields: {
          manager?: string;
          veterinarian_name?: string;
        };
      };
      update: {
        fields: {
          manager?: string;
          veterinarian_name?: string;
        };
      };
    };
    pdf_daily_entry: {
      row: {
        fields: {
          weight: string | null;
          cow_code: string | null;
          remark: string | null;
          cow_number: string | null;
          owner_name: string | null;
          height: string | null;
        };
      };
      insert: {
        fields: {
          weight?: string;
          cow_code?: string;
          remark?: string;
          cow_number?: string;
          owner_name?: string;
          height?: string;
        };
      };
      update: {
        fields: {
          weight?: string;
          cow_code?: string;
          remark?: string;
          cow_number?: string;
          owner_name?: string;
          height?: string;
        };
      };
    };
    pdf: {
      row: {
        fields: {
          id: string | null;
          path: string | null;
        };
      };
      insert: {
        fields: {
          id?: string;
          path?: string;
        };
      };
      update: {
        fields: {
          id?: string;
          path?: string;
        };
      };
    };
    'cow-detail': {
      row: {
        fields: {
          pk: string;
          _fk_owner_pk: string | null;
          owner_id: number | null;
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
          cow_id: number | null;
          label: string | null;
          birth_date: string | null;
          sex: string | null;
          in_day: string | null;
          out_day: string | null;
          destination_id: number | null;
          variety: string | null;
          desired_species_id_1: number | null;
          desired_species_id_2: number | null;
          desired_species_id_3: number | null;
          fertilization_notes: string | null;
          in_weight: number | null;
          in_height: number | null;
          enrollment_check: number | null;
          state: string | null;
          in_count: number;
          estrus_cycle: string;
          Insemination_start_date: string | null;
          expected_pregnancy_test_date: string;
          vaccine_program_id: string | null;
          '━━━━━━━━ 繁殖': string | null;
          latest_breeding_count: number | null;
          latest_breeding_method: string | null;
          latest_estrus_date: string | null;
          latest_fertilization_date: string | null;
          latest_fertilization_content: string | null;
          expected_calving_date: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          _fk_owner_pk?: string;
          owner_id?: number;
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
          cow_id?: number;
          label?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
          destination_id?: number;
          variety?: string;
          desired_species_id_1?: number;
          desired_species_id_2?: number;
          desired_species_id_3?: number;
          fertilization_notes?: string;
          in_weight?: number;
          in_height?: number;
          enrollment_check?: number;
          state?: string;
          Insemination_start_date?: string;
          vaccine_program_id?: string;
          '━━━━━━━━ 繁殖'?: string;
          latest_breeding_count?: number;
          latest_breeding_method?: string;
          latest_estrus_date?: string;
          latest_fertilization_date?: string;
          latest_fertilization_content?: string;
          expected_calving_date?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          _fk_owner_pk?: string;
          owner_id?: number;
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
          cow_id?: number;
          label?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
          destination_id?: number;
          variety?: string;
          desired_species_id_1?: number;
          desired_species_id_2?: number;
          desired_species_id_3?: number;
          fertilization_notes?: string;
          in_weight?: number;
          in_height?: number;
          enrollment_check?: number;
          state?: string;
          Insemination_start_date?: string;
          vaccine_program_id?: string;
          '━━━━━━━━ 繁殖'?: string;
          latest_breeding_count?: number;
          latest_breeding_method?: string;
          latest_estrus_date?: string;
          latest_fertilization_date?: string;
          latest_fertilization_content?: string;
          expected_calving_date?: string;
        };
      };
    };
    cows: {
      row: {
        fields: {
          pk: string;
          _fk_cow_pk: string | null;
          cow_code: string | null;
          owner_id: number | null;
          date: string | null;
          classification_name: string | null;
          content_note: string | null;
          price: number | null;
          quantity: number | null;
          remark: string | null;
          reservation_date: string | null;
          manager: string | null;
          veterinarian_name: string | null;
          state: string | null;
          pregnancy_test_date: string | null;
          delivery_date: string | null;
          expected_age_of_delivery: number;
          label: string | null;
          _fk_pk_cow: string | null;
          cow_number: string | null;
          owner_name: string | null;
          cow_id: number | null;
          body_temperature: number | null;
          classification_id: number | null;
          disease_name_id: number | null;
          symptoms_id: number | null;
          treatment_content1_id: number | null;
          quantity1: number | null;
          treatment_content2_id: number | null;
          quantity2: number | null;
          treatment_content3_id: number | null;
          quantity3: number | null;
          treatment_content4_id: number | null;
          quantity4: number | null;
          veterinarian_id: number | null;
          treatment_classification: string | null;
          disease_name: string | null;
          symptoms: string | null;
          treatment_content1: string | null;
          price1: number | null;
          treatment_content2: string | null;
          price2: number | null;
          treatment_content3: string | null;
          price3: number | null;
          treatment_content4: string | null;
          price4: number | null;
          veterinarian: string | null;
          farm_id: string | null;
          birth_date: string | null;
          sex: string | null;
          in_day: string | null;
          out_day: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          _fk_cow_pk?: string;
          cow_code?: string;
          owner_id?: number;
          date?: string;
          classification_name?: string;
          content_note?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          reservation_date?: string;
          manager?: string;
          veterinarian_name?: string;
          state?: string;
          pregnancy_test_date?: string;
          delivery_date?: string;
          label?: string;
          _fk_pk_cow?: string;
          cow_number?: string;
          owner_name?: string;
          cow_id?: number;
          body_temperature?: number;
          classification_id?: number;
          disease_name_id?: number;
          symptoms_id?: number;
          treatment_content1_id?: number;
          quantity1?: number;
          treatment_content2_id?: number;
          quantity2?: number;
          treatment_content3_id?: number;
          quantity3?: number;
          treatment_content4_id?: number;
          quantity4?: number;
          veterinarian_id?: number;
          treatment_classification?: string;
          disease_name?: string;
          symptoms?: string;
          treatment_content1?: string;
          price1?: number;
          treatment_content2?: string;
          price2?: number;
          treatment_content3?: string;
          price3?: number;
          treatment_content4?: string;
          price4?: number;
          veterinarian?: string;
          farm_id?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          _fk_cow_pk?: string;
          cow_code?: string;
          owner_id?: number;
          date?: string;
          classification_name?: string;
          content_note?: string;
          price?: number;
          quantity?: number;
          remark?: string;
          reservation_date?: string;
          manager?: string;
          veterinarian_name?: string;
          state?: string;
          pregnancy_test_date?: string;
          delivery_date?: string;
          label?: string;
          _fk_pk_cow?: string;
          cow_number?: string;
          owner_name?: string;
          cow_id?: number;
          body_temperature?: number;
          classification_id?: number;
          disease_name_id?: number;
          symptoms_id?: number;
          treatment_content1_id?: number;
          quantity1?: number;
          treatment_content2_id?: number;
          quantity2?: number;
          treatment_content3_id?: number;
          quantity3?: number;
          treatment_content4_id?: number;
          quantity4?: number;
          veterinarian_id?: number;
          treatment_classification?: string;
          disease_name?: string;
          symptoms?: string;
          treatment_content1?: string;
          price1?: number;
          treatment_content2?: string;
          price2?: number;
          treatment_content3?: string;
          price3?: number;
          treatment_content4?: string;
          price4?: number;
          veterinarian?: string;
          farm_id?: string;
          birth_date?: string;
          sex?: string;
          in_day?: string;
          out_day?: string;
        };
      };
    };
    cowshed_move: {
      row: {
        fields: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          date: string | null;
          種別: string | null;
          cowshed_id: number | null;
          cowshed_name: string | null;
          pen_id: number | null;
          pen_name: string | null;
          remark: string | null;
          作成情報タイムスタンプ: string;
          作成者: string;
          修正情報タイムスタンプ: string;
          修正者: string;
        };
      };
      insert: {
        fields: {
          pk: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          種別?: string;
          cowshed_id?: number;
          cowshed_name?: string;
          pen_id?: number;
          pen_name?: string;
          remark?: string;
          作成情報タイムスタンプ: string;
          作成者: string;
          修正情報タイムスタンプ: string;
          修正者: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          種別?: string;
          cowshed_id?: number;
          cowshed_name?: string;
          pen_id?: number;
          pen_name?: string;
          remark?: string;
          作成情報タイムスタンプ?: string;
          作成者?: string;
          修正情報タイムスタンプ?: string;
          修正者?: string;
        };
      };
    };
    exit: {
      row: {
        fields: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          date: string | null;
          type: string | null;
          remark: string | null;
        };
      };
      insert: {
        fields: {
          pk: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          type?: string;
          remark?: string;
        };
      };
      update: {
        fields: {
          pk?: string;
          fk_cow_pk?: string;
          cow_number?: string;
          owner_id?: number;
          cow_id?: number;
          date?: string;
          type?: string;
          remark?: string;
        };
      };
    };
    'cows-list': {
      row: {
        fields: {
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
          enrollment_check: number | null;
          pk: string;
          owner_id: number | null;
        };
      };
      insert: {
        fields: {
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
          enrollment_check?: number;
          pk: string;
          owner_id?: number;
        };
      };
      update: {
        fields: {
          owner_name?: string;
          cow_code?: string;
          cow_number?: string;
          enrollment_check?: number;
          pk?: string;
          owner_id?: number;
        };
      };
    };
    measurement: {
      row: {
        fields: {
          weight: number | null;
          height: number | null;
          date: string | null;
        };
      };
      insert: {
        fields: {
          weight?: number;
          height?: number;
          date?: string;
        };
      };
      update: {
        fields: {
          weight?: number;
          height?: number;
          date?: string;
        };
      };
    };
    schedule: {
      row: {
        fields: {
          add_date: string | null;
          title: string | null;
          content: string | null;
          tag: string | null;
          scheduled_date: string | null;
          start_period: string | null;
          end_period: string | null;
          repeat_type: number | null;
          repeat_interval: number | null;
          repeat_end_date: string | null;
          pk: string;
          cow_code: string | null;
          owner_name: string | null;
          state: string | null;
          latest_breeding_count: number | null;
          latest_breeding_method: string | null;
          latest_estrus_date: string | null;
          latest_fertilization_date: string | null;
          latest_fertilization_content: string | null;
          expected_calving_date: string | null;
          expected_pregnancy_test_date: string;
          estrus_cycle: string;
        };
      };
      insert: {
        fields: {
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          start_period?: string;
          end_period?: string;
          repeat_type?: number;
          repeat_interval?: number;
          repeat_end_date?: string;
          pk: string;
          cow_code?: string;
          owner_name?: string;
          state?: string;
          latest_breeding_count?: number;
          latest_breeding_method?: string;
          latest_estrus_date?: string;
          latest_fertilization_date?: string;
          latest_fertilization_content?: string;
          expected_calving_date?: string;
        };
      };
      update: {
        fields: {
          add_date?: string;
          title?: string;
          content?: string;
          tag?: string;
          scheduled_date?: string;
          start_period?: string;
          end_period?: string;
          repeat_type?: number;
          repeat_interval?: number;
          repeat_end_date?: string;
          pk?: string;
          cow_code?: string;
          owner_name?: string;
          state?: string;
          latest_breeding_count?: number;
          latest_breeding_method?: string;
          latest_estrus_date?: string;
          latest_fertilization_date?: string;
          latest_fertilization_content?: string;
          expected_calving_date?: string;
        };
      };
    };
    vaccine_program_master: {
      row: {
        fields: {
          name: string | null;
          description: string | null;
          tag: string | null;
          pk: string;
          id: number | null;
          program_id: string | null;
          vaccine_id: number | null;
          days_from_birth: number | null;
          hidden: number | null;
          delete_flag: number | null;
        };
      };
      insert: {
        fields: {
          name?: string;
          description?: string;
          tag?: string;
          pk: string;
          id?: number;
          program_id?: string;
          vaccine_id?: number;
          days_from_birth?: number;
          hidden?: number;
          delete_flag?: number;
        };
      };
      update: {
        fields: {
          name?: string;
          description?: string;
          tag?: string;
          pk?: string;
          id?: number;
          program_id?: string;
          vaccine_id?: number;
          days_from_birth?: number;
          hidden?: number;
          delete_flag?: number;
        };
      };
    };
    vaccine_prgram_schedule: {
      row: {
        fields: {
          program_id: string | null;
          vaccine_id: number | null;
          days_from_birth: number | null;
        };
      };
      insert: {
        fields: {
          program_id?: string;
          vaccine_id?: number;
          days_from_birth?: number;
        };
      };
      update: {
        fields: {
          program_id?: string;
          vaccine_id?: number;
          days_from_birth?: number;
        };
      };
    };
  };
  Script: {
    script: [
      {
        id: 26;
        name: 'onWindwos_fileName';
      },
      {
        id: 28;
        name: 'trigger';
      },
      {
        id: 23;
        name: '--';
      },
      {
        id: 30;
        name: 'test';
      },
      {
        id: 31;
        name: 'test 2';
      },
      {
        id: 1;
        name: 'アカウント制御';
      },
      {
        id: 2;
        name: '_アカウント登録';
      },
      {
        id: 3;
        name: '_アカウントパスワード更新';
      },
      {
        id: 6;
        name: '_アカウント有効化';
      },
      {
        id: 4;
        name: '_アカウント削除';
      },
      {
        id: 18;
        name: 'server_pdf';
      },
      {
        id: 22;
        name: 'pdf';
      },
      {
        id: 21;
        name: 'pdf_dairy_entry';
      },
      {
        id: 17;
        name: 'pdf_dairy_hansyoku';
      },
      {
        id: 19;
        name: 'excel_dairy_hansyoku';
      },
      {
        id: 20;
        name: 'server_excel';
      },
      {
        id: 24;
        name: '新規スクリプト';
      },
      {
        id: 27;
        name: 'onlayoutExit_cow_pk';
      },
      {
        id: 25;
        name: 'all_update';
      }
    ];
  };
};
