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
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          furikana: string | null;
          hidden: number | null;
          pass: string | null;
          role: string | null;
          farm_id: number | null;
        };
        portalData: {
          'entry|cows': Array<{
            pk?: string;
            _fk_owner_pk?: string;
            owner_id?: number | null;
            owner_name?: string | null;
            cow_code?: string | null;
            cow_number?: string | null;
            cow_id?: number | null;
            label?: string | null;
            birth_date?: string | null;
            sex?: string | null;
            in_day?: string | null;
            out_day?: string | null;
            destination_id?: number | null;
            variety?: string | null;
            desired_species_id_1?: number | null;
            desired_species_id_2?: number | null;
            desired_species_id_3?: number | null;
            enrollment_check?: number | null;
            state?: string | null;
            in_count?: number | null;
            estrus_cycle?: string | null;
            expected_pregnancy_test_date?: string | null;
            vaccine_program_id?: string | null;
            Insemination_start_date?: string | null;
            repeat_type?: number | null;
            fk?: string | null;
            add_date?: string | null;
            title?: string | null;
            content?: string | null;
            tag?: string | null;
            scheduled_date?: string | null;
            start_period?: string | null;
            end_period?: string | null;
            repeat_interval?: number | null;
            repeat_end_date?: string | null;
          }>;
          'entry|schedule': Array<{
            pk: string;
            repeat_type: number | null;
            fk: string | null;
            cow_code: string | null;
            add_date: string | null;
            title: string | null;
            content: string | null;
            tag: string | null;
            scheduled_date: string | null;
            start_period: string | null;
            end_period: string | null;
            repeat_interval: number | null;
            repeat_end_date: string | null;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          furikana?: string | null;
          hidden?: number | null;
          pass?: string | null;
          role?: string | null;
          farm_id?: number | null;
        }>;
      };
    };

    farm: {
      read: {
        fieldData: {
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
      create: {
        fieldData: {
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
      update: {
        fieldData: Partial<{
          _pk?: string;
          farm_id?: number | null;
          farm_name?: string | null;
          owner_name?: string | null;
          address?: string | null;
          post_code?: string | null;
          tel?: string | null;
          FAX?: string | null;
          mail?: string | null;
          farm_code?: string | null;
          pregnancy_test_days?: number | null;
          pregnancy_days?: number | null;
          billing_name?: string | null;
          billing_address?: string | null;
          billing_post_code?: string | null;
          billing_tel?: string | null;
          billing_fax?: string | null;
          billing_mail?: string | null;
          tax?: number | null;
          invoice_code?: string | null;
          calf_age_days?: number | null;
          cattle_age_days?: number | null;
        }>;
      };
    };

    owner: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
          summer_price: number | null;
          修正情報タイムスタンプ: string;
          count: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
          summer_price: number | null;
          修正情報タイムスタンプ: string;
          count: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
          summer_price?: number | null;
          修正情報タイムスタンプ?: string;
          count?: number | null;
        }>;
      };
    };

    staff_master: {
      read: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          furikana: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          furikana: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          id?: number | null;
          name?: string | null;
          furikana?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    herd_cattle_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    pen_master: {
      read: {
        fieldData: {
          id: number | null;
          _pk: string;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          id: number | null;
          _pk: string;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          id?: number | null;
          _pk?: string;
          name?: string | null;
          delete_flag?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    variety_master: {
      read: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          delete_flag: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          id?: number | null;
          name?: string | null;
          delete_flag?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    breeding_classification_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
          delete_flag: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
          delete_flag: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
          delete_flag?: number | null;
        }>;
      };
    };

    semen_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
          semen_code: string | null;
          delete_flag: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
          semen_code: string | null;
          delete_flag: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          price?: number | null;
          hidden?: number | null;
          semen_code?: string | null;
          delete_flag?: number | null;
        }>;
      };
    };

    embryo_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          price?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    estrus_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    reproductive_treatment_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          price?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    egg_inspection_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          remark: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          remark: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          remark?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    veterinarian_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    treatment_crassification_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    disease_name_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          type?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    symptoms_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          hidden?: number | null;
        }>;
      };
    };

    medicine_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          price?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    vaccine_master: {
      read: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      create: {
        fieldData: {
          pk: string;
          id: number | null;
          name: string | null;
          type: string | null;
          price: number | null;
          hidden: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          id?: number | null;
          name?: string | null;
          type?: string | null;
          price?: number | null;
          hidden?: number | null;
        }>;
      };
    };

    special_payment_master: {
      read: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          classification: string | null;
          delete_flag: number | null;
        };
      };
      create: {
        fieldData: {
          _pk: string;
          id: number | null;
          name: string | null;
          classification: string | null;
          delete_flag: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          _pk?: string;
          id?: number | null;
          name?: string | null;
          classification?: string | null;
          delete_flag?: number | null;
        }>;
      };
    };

    entry: {
      read: {
        fieldData: {
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
          in_count: number | null;
          estrus_cycle: string | null;
          expected_pregnancy_test_date: string | null;
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
        portalData: {
          'entry|cows': Array<{
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
            enrollment_check: number | null;
            state: string | null;
            in_count: number | null;
            estrus_cycle: string | null;
            expected_pregnancy_test_date: string | null;
            vaccine_program_id: string | null;
            Insemination_start_date: string | null;
          }>;
          'entry|schedule': Array<{
            pk: string;
            repeat_type: number | null;
            fk: string | null;
            cow_code: string | null;
            add_date: string | null;
            title: string | null;
            content: string | null;
            tag: string | null;
            scheduled_date: string | null;
            start_period: string | null;
            end_period: string | null;
            repeat_interval: number | null;
            repeat_end_date: string | null;
          }>;
        };
      };
      create: {
        fieldData: {
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
          in_count: number | null;
          estrus_cycle: string | null;
          expected_pregnancy_test_date: string | null;
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
        portalData: {
          'entry|cows': Array<{
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
            enrollment_check: number | null;
            state: string | null;
            in_count: number | null;
            estrus_cycle: string | null;
            expected_pregnancy_test_date: string | null;
            vaccine_program_id: string | null;
            Insemination_start_date: string | null;
          }>;
          'entry|schedule': Array<{
            pk: string;
            repeat_type: number | null;
            fk: string | null;
            cow_code: string | null;
            add_date: string | null;
            title: string | null;
            content: string | null;
            tag: string | null;
            scheduled_date: string | null;
            start_period: string | null;
            end_period: string | null;
            repeat_interval: number | null;
            repeat_end_date: string | null;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          fk_cow_pk?: string | null;
          cow_number?: string | null;
          owner_id?: number | null;
          cow_id?: number | null;
          date?: string | null;
          type?: string | null;
          remark?: string | null;
          weight?: string | null;
          height?: string | null;
          cow_code?: string | null;
          _fk_owner_pk?: string | null;
          owner_name?: string | null;
          label?: string | null;
          birth_date?: string | null;
          sex?: string | null;
          in_day?: string | null;
          out_day?: string | null;
          destination_id?: number | null;
          variety?: string | null;
          desired_species_id_1?: number | null;
          desired_species_id_2?: number | null;
          desired_species_id_3?: number | null;
          enrollment_check?: number | null;
          state?: string | null;
          in_count?: number | null;
          estrus_cycle?: string | null;
          expected_pregnancy_test_date?: string | null;
          vaccine_program_id?: string | null;
          Insemination_start_date?: string | null;
          repeat_type?: number | null;
          fk?: string | null;
          add_date?: string | null;
          title?: string | null;
          content?: string | null;
          tag?: string | null;
          scheduled_date?: string | null;
          start_period?: string | null;
          end_period?: string | null;
          repeat_interval?: number | null;
          repeat_end_date?: string | null;
        }>;
        portalData: {
          'entry|cows': Array<{
            recordId: string;
            pk?: string;
            _fk_owner_pk?: string | null;
            owner_id?: number | null;
            owner_name?: string | null;
            cow_code?: string | null;
            cow_number?: string | null;
            cow_id?: number | null;
            label?: string | null;
            birth_date?: string | null;
            sex?: string | null;
            in_day?: string | null;
            out_day?: string | null;
            destination_id?: number | null;
            variety?: string | null;
            desired_species_id_1?: number | null;
            desired_species_id_2?: number | null;
            desired_species_id_3?: number | null;
            enrollment_check?: number | null;
            state?: string | null;
            in_count?: number | null;
            estrus_cycle?: string | null;
            expected_pregnancy_test_date?: string | null;
            vaccine_program_id?: string | null;
            Insemination_start_date?: string | null;
          }>;
          'entry|schedule': Array<{
            recordId: string;
            pk?: string;
            repeat_type?: number | null;
            fk?: string | null;
            cow_code?: string | null;
            add_date?: string | null;
            title?: string | null;
            content?: string | null;
            tag?: string | null;
            scheduled_date?: string | null;
            start_period?: string | null;
            end_period?: string | null;
            repeat_interval?: number | null;
            repeat_end_date?: string | null;
          }>;
        };
      };
    };

    vaccine: {
      read: {
        fieldData: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          '━━━━━━━━ 履歴': string | null;
          date: string | null;
          type: number | null;
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
      create: {
        fieldData: {
          pk: string;
          fk_cow_pk: string | null;
          cow_number: string | null;
          owner_id: number | null;
          cow_id: number | null;
          '━━━━━━━━ 履歴': string | null;
          date: string | null;
          type: number | null;
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
      update: {
        fieldData: Partial<{
          pk?: string;
          fk_cow_pk?: string | null;
          cow_number?: string | null;
          owner_id?: number | null;
          cow_id?: number | null;
          '━━━━━━━━ 履歴'?: string | null;
          date?: string | null;
          type?: number | null;
          content_id?: number | null;
          content?: string | null;
          price?: number | null;
          quantity?: number | null;
          remark?: string | null;
          作成情報タイムスタンプ?: string;
          作成者?: string;
          修正情報タイムスタンプ?: string;
          修正者?: string;
          veterinarian_id?: number | null;
          veterinarian_name?: string | null;
          manager?: string | null;
        }>;
      };
    };

    treatment: {
      read: {
        fieldData: {
          pk: string;
          _fk_pk_cow: string | null;
          cow_number: string | null;
          owner_id: number | null;
          owner_name: string | null;
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
      create: {
        fieldData: {
          pk: string;
          _fk_pk_cow: string | null;
          cow_number: string | null;
          owner_id: number | null;
          owner_name: string | null;
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
      update: {
        fieldData: Partial<{
          pk?: string;
          _fk_pk_cow?: string | null;
          cow_number?: string | null;
          owner_id?: number | null;
          owner_name?: string | null;
          cow_id?: number | null;
          date?: string | null;
          body_temperature?: number | null;
          classification_id?: number | null;
          disease_name_id?: number | null;
          symptoms_id?: number | null;
          treatment_content1_id?: number | null;
          quantity1?: number | null;
          treatment_content2_id?: number | null;
          quantity2?: number | null;
          treatment_content3_id?: number | null;
          quantity3?: number | null;
          treatment_content4_id?: number | null;
          quantity4?: number | null;
          veterinarian_id?: number | null;
          treatment_classification?: string | null;
          disease_name?: string | null;
          symptoms?: string | null;
          treatment_content1?: string | null;
          treatment_content2?: string | null;
          price2?: number | null;
          treatment_content3?: string | null;
          price3?: number | null;
          treatment_content4?: string | null;
          price4?: number | null;
          reservation_date?: string | null;
          veterinarian?: string | null;
          manager?: string | null;
          remark?: string | null;
        }>;
      };
    };

    breeding: {
      read: {
        fieldData: {
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
          expected_age_of_delivery: number | null;
          owner_name: string | null;
        };
        portalData: {
          'breeding|schedule': Array<{
            pk: string;
            fk: string | null;
            add_date: string | null;
            title: string | null;
            content: string | null;
            tag: string | null;
            scheduled_date: string | null;
            cow_code: string | null;
          }>;
          'breeding|cows': Array<{
            pk: string;
          }>;
        };
      };
      create: {
        fieldData: {
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
          expected_age_of_delivery: number | null;
          owner_name: string | null;
        };
        portalData: {
          'breeding|schedule': Array<{
            pk: string;
            fk: string | null;
            add_date: string | null;
            title: string | null;
            content: string | null;
            tag: string | null;
            scheduled_date: string | null;
            cow_code: string | null;
          }>;
          'breeding|cows': Array<{
            pk: string;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          fk?: string | null;
          add_date?: string | null;
          title?: string | null;
          content?: string | null;
          tag?: string | null;
          scheduled_date?: string | null;
          cow_code?: string | null;
          owner_id?: number | null;
          _fk_cow_pk?: string | null;
          classification_name?: string | null;
          date?: string | null;
          content_note?: string | null;
          price?: number | null;
          quantity?: number | null;
          remark?: string | null;
          reservation_date?: string | null;
          manager?: string | null;
          veterinarian_name?: string | null;
          label?: string | null;
          state?: string | null;
          pregnancy_test_date?: string | null;
          delivery_date?: string | null;
          expected_age_of_delivery?: number | null;
          owner_name?: string | null;
        }>;
        portalData: {
          'breeding|schedule': Array<{
            recordId: string;
            pk?: string;
            fk?: string | null;
            add_date?: string | null;
            title?: string | null;
            content?: string | null;
            tag?: string | null;
            scheduled_date?: string | null;
            cow_code?: string | null;
          }>;
          'breeding|cows': Array<{
            recordId: string;
            pk?: string;
          }>;
        };
      };
    };

    expected_pregnancy_test_date: {
      read: {
        fieldData: {
          expected_pregnancy_test_date: string | null;
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
        };
      };
      create: {
        fieldData: {
          expected_pregnancy_test_date: string | null;
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          expected_pregnancy_test_date?: string | null;
          owner_name?: string | null;
          cow_code?: string | null;
          cow_number?: string | null;
        }>;
      };
    };

    dashboard: {
      read: {
        fieldData: {
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
        portalData: {
          cows_count1: Array<{
            pk: string;
          }>;
          cows_count2: Array<{
            pk: string;
          }>;
        };
      };
      create: {
        fieldData: {
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
        portalData: {
          cows_count1: Array<{
            pk: string;
          }>;
          cows_count2: Array<{
            pk: string;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          date?: string | null;
          enrollment_check?: number | null;
          ai?: number | null;
          et?: number | null;
          hatujou?: number | null;
          syoshin?: number | null;
          saishin?: number | null;
          hansyokutiryou?: number | null;
          vaccine?: string | null;
          idou?: string | null;
          jokaku?: string | null;
        }>;
        portalData: {
          cows_count1: Array<{
            recordId: string;
            pk?: string;
          }>;
          cows_count2: Array<{
            recordId: string;
            pk?: string;
          }>;
        };
      };
    };

    'diary-report': {
      read: {
        fieldData: {
          date: string | null;
          pk: string;
        };
        portalData: {
          'breeding|ai': Array<{
            pk: string;
          }>;
          'breeding|et': Array<{
            pk: string;
          }>;
          in_count: Array<{
            pk: string;
          }>;
          out_count: Array<{
            pk: string;
          }>;
          'breeding|hatujou': Array<{
            pk: string;
          }>;
          diary_cowshed_move: Array<{
            pk: string;
          }>;
          diary_treatment_hannsyokutiryou: Array<{
            pk: string;
          }>;
          diary_treatment_saishin: Array<{
            pk: string;
          }>;
          diary_treatment_syoshin: Array<{
            pk: string;
          }>;
          diary_vaccine_count: Array<{
            pk: string;
          }>;
        };
      };
      create: {
        fieldData: {
          date: string | null;
          pk: string;
        };
        portalData: {
          'breeding|ai': Array<{
            pk: string;
          }>;
          'breeding|et': Array<{
            pk: string;
          }>;
          in_count: Array<{
            pk: string;
          }>;
          out_count: Array<{
            pk: string;
          }>;
          'breeding|hatujou': Array<{
            pk: string;
          }>;
          diary_cowshed_move: Array<{
            pk: string;
          }>;
          diary_treatment_hannsyokutiryou: Array<{
            pk: string;
          }>;
          diary_treatment_saishin: Array<{
            pk: string;
          }>;
          diary_treatment_syoshin: Array<{
            pk: string;
          }>;
          diary_vaccine_count: Array<{
            pk: string;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          date?: string | null;
          pk?: string;
        }>;
        portalData: {
          'breeding|ai': Array<{
            recordId: string;
            pk?: string;
          }>;
          'breeding|et': Array<{
            recordId: string;
            pk?: string;
          }>;
          in_count: Array<{
            recordId: string;
            pk?: string;
          }>;
          out_count: Array<{
            recordId: string;
            pk?: string;
          }>;
          'breeding|hatujou': Array<{
            recordId: string;
            pk?: string;
          }>;
          diary_cowshed_move: Array<{
            recordId: string;
            pk?: string;
          }>;
          diary_treatment_hannsyokutiryou: Array<{
            recordId: string;
            pk?: string;
          }>;
          diary_treatment_saishin: Array<{
            recordId: string;
            pk?: string;
          }>;
          diary_treatment_syoshin: Array<{
            recordId: string;
            pk?: string;
          }>;
          diary_vaccine_count: Array<{
            recordId: string;
            pk?: string;
          }>;
        };
      };
    };

    pdf_daily_hansyoku: {
      read: {
        fieldData: {
          manager: string | null;
          veterinarian_name: string | null;
        };
      };
      create: {
        fieldData: {
          manager: string | null;
          veterinarian_name: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          manager?: string | null;
          veterinarian_name?: string | null;
        }>;
      };
    };

    pdf_daily_entry: {
      read: {
        fieldData: {
          weight: string | null;
          cow_code: string | null;
          remark: string | null;
          cow_number: string | null;
          owner_name: string | null;
          height: string | null;
        };
      };
      create: {
        fieldData: {
          weight: string | null;
          cow_code: string | null;
          remark: string | null;
          cow_number: string | null;
          owner_name: string | null;
          height: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          weight?: string | null;
          cow_code?: string | null;
          remark?: string | null;
          cow_number?: string | null;
          owner_name?: string | null;
          height?: string | null;
        }>;
      };
    };

    pdf: {
      read: {
        fieldData: {
          id: string | null;
          path: string | null;
        };
      };
      create: {
        fieldData: {
          id: string | null;
          path: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          id?: string | null;
          path?: string | null;
        }>;
      };
    };

    'cow-detail': {
      read: {
        fieldData: {
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
          in_count: number | null;
          estrus_cycle: string | null;
          Insemination_start_date: string | null;
          expected_pregnancy_test_date: string | null;
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
      create: {
        fieldData: {
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
          in_count: number | null;
          estrus_cycle: string | null;
          Insemination_start_date: string | null;
          expected_pregnancy_test_date: string | null;
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
      update: {
        fieldData: Partial<{
          pk?: string;
          _fk_owner_pk?: string | null;
          owner_id?: number | null;
          owner_name?: string | null;
          cow_code?: string | null;
          cow_number?: string | null;
          cow_id?: number | null;
          label?: string | null;
          birth_date?: string | null;
          sex?: string | null;
          in_day?: string | null;
          out_day?: string | null;
          destination_id?: number | null;
          variety?: string | null;
          desired_species_id_1?: number | null;
          desired_species_id_2?: number | null;
          desired_species_id_3?: number | null;
          fertilization_notes?: string | null;
          in_weight?: number | null;
          in_height?: number | null;
          enrollment_check?: number | null;
          state?: string | null;
          in_count?: number | null;
          estrus_cycle?: string | null;
          Insemination_start_date?: string | null;
          expected_pregnancy_test_date?: string | null;
          vaccine_program_id?: string | null;
          '━━━━━━━━ 繁殖'?: string | null;
          latest_breeding_count?: number | null;
          latest_breeding_method?: string | null;
          latest_estrus_date?: string | null;
          latest_fertilization_date?: string | null;
          latest_fertilization_content?: string | null;
          expected_calving_date?: string | null;
        }>;
      };
    };

    cows: {
      read: {
        fieldData: {
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
          expected_age_of_delivery: number | null;
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
        portalData: {
          'cows|breeding|descend': Array<{
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
            expected_age_of_delivery: number | null;
            label: string | null;
          }>;
          'cows|treatment': Array<{
            pk: string;
            _fk_pk_cow: string | null;
            cow_number: string | null;
            owner_id: number | null;
            owner_name: string | null;
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
            price1: number | null;
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
          }>;
        };
      };
      create: {
        fieldData: {
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
          expected_age_of_delivery: number | null;
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
        portalData: {
          'cows|breeding|descend': Array<{
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
            expected_age_of_delivery: number | null;
            label: string | null;
          }>;
          'cows|treatment': Array<{
            pk: string;
            _fk_pk_cow: string | null;
            cow_number: string | null;
            owner_id: number | null;
            owner_name: string | null;
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
            price1: number | null;
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
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          pk?: string;
          _fk_cow_pk?: string | null;
          cow_code?: string | null;
          owner_id?: number | null;
          date?: string | null;
          classification_name?: string | null;
          content_note?: string | null;
          price?: number | null;
          quantity?: number | null;
          remark?: string | null;
          reservation_date?: string | null;
          manager?: string | null;
          veterinarian_name?: string | null;
          state?: string | null;
          pregnancy_test_date?: string | null;
          delivery_date?: string | null;
          expected_age_of_delivery?: number | null;
          label?: string | null;
          _fk_pk_cow?: string | null;
          cow_number?: string | null;
          owner_name?: string | null;
          cow_id?: number | null;
          body_temperature?: number | null;
          classification_id?: number | null;
          disease_name_id?: number | null;
          symptoms_id?: number | null;
          treatment_content1_id?: number | null;
          quantity1?: number | null;
          treatment_content2_id?: number | null;
          quantity2?: number | null;
          treatment_content3_id?: number | null;
          quantity3?: number | null;
          treatment_content4_id?: number | null;
          quantity4?: number | null;
          veterinarian_id?: number | null;
          treatment_classification?: string | null;
          disease_name?: string | null;
          symptoms?: string | null;
          treatment_content1?: string | null;
          price1?: number | null;
          treatment_content2?: string | null;
          price2?: number | null;
          treatment_content3?: string | null;
          price3?: number | null;
          treatment_content4?: string | null;
          price4?: number | null;
          veterinarian?: string | null;
          farm_id?: string | null;
          birth_date?: string | null;
          sex?: string | null;
          in_day?: string | null;
          out_day?: string | null;
        }>;
        portalData: {
          'cows|breeding|descend': Array<{
            recordId: string;
            pk?: string;
            _fk_cow_pk?: string | null;
            cow_code?: string | null;
            owner_id?: number | null;
            date?: string | null;
            classification_name?: string | null;
            content_note?: string | null;
            price?: number | null;
            quantity?: number | null;
            remark?: string | null;
            reservation_date?: string | null;
            manager?: string | null;
            veterinarian_name?: string | null;
            state?: string | null;
            pregnancy_test_date?: string | null;
            delivery_date?: string | null;
            expected_age_of_delivery?: number | null;
            label?: string | null;
          }>;
          'cows|treatment': Array<{
            recordId: string;
            pk?: string;
            _fk_pk_cow?: string | null;
            cow_number?: string | null;
            owner_id?: number | null;
            owner_name?: string | null;
            cow_id?: number | null;
            date?: string | null;
            body_temperature?: number | null;
            classification_id?: number | null;
            disease_name_id?: number | null;
            symptoms_id?: number | null;
            treatment_content1_id?: number | null;
            quantity1?: number | null;
            treatment_content2_id?: number | null;
            quantity2?: number | null;
            treatment_content3_id?: number | null;
            quantity3?: number | null;
            treatment_content4_id?: number | null;
            quantity4?: number | null;
            veterinarian_id?: number | null;
            treatment_classification?: string | null;
            disease_name?: string | null;
            symptoms?: string | null;
            treatment_content1?: string | null;
            price1?: number | null;
            treatment_content2?: string | null;
            price2?: number | null;
            treatment_content3?: string | null;
            price3?: number | null;
            treatment_content4?: string | null;
            price4?: number | null;
            reservation_date?: string | null;
            veterinarian?: string | null;
            manager?: string | null;
            remark?: string | null;
          }>;
        };
      };
    };

    cowshed_move: {
      read: {
        fieldData: {
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
      create: {
        fieldData: {
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
      update: {
        fieldData: Partial<{
          pk?: string;
          fk_cow_pk?: string | null;
          cow_number?: string | null;
          owner_id?: number | null;
          cow_id?: number | null;
          date?: string | null;
          種別?: string | null;
          cowshed_id?: number | null;
          cowshed_name?: string | null;
          pen_id?: number | null;
          pen_name?: string | null;
          remark?: string | null;
          作成情報タイムスタンプ?: string;
          作成者?: string;
          修正情報タイムスタンプ?: string;
          修正者?: string;
        }>;
      };
    };

    exit: {
      read: {
        fieldData: {
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
      create: {
        fieldData: {
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
      update: {
        fieldData: Partial<{
          pk?: string;
          fk_cow_pk?: string | null;
          cow_number?: string | null;
          owner_id?: number | null;
          cow_id?: number | null;
          date?: string | null;
          type?: string | null;
          remark?: string | null;
        }>;
      };
    };

    'cows-list': {
      read: {
        fieldData: {
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
          enrollment_check: number | null;
          pk: string;
          owner_id: number | null;
        };
      };
      create: {
        fieldData: {
          owner_name: string | null;
          cow_code: string | null;
          cow_number: string | null;
          enrollment_check: number | null;
          pk: string;
          owner_id: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          owner_name?: string | null;
          cow_code?: string | null;
          cow_number?: string | null;
          enrollment_check?: number | null;
          pk?: string;
          owner_id?: number | null;
        }>;
      };
    };

    measurement: {
      read: {
        fieldData: {
          weight: number | null;
          height: number | null;
          date: string | null;
        };
      };
      create: {
        fieldData: {
          weight: number | null;
          height: number | null;
          date: string | null;
        };
      };
      update: {
        fieldData: Partial<{
          weight?: number | null;
          height?: number | null;
          date?: string | null;
        }>;
      };
    };

    schedule: {
      read: {
        fieldData: {
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
          expected_pregnancy_test_date: string | null;
          estrus_cycle: string | null;
        };
        portalData: {
          'schedule|cows': Array<{
            owner_name: string | null;
            cow_code: string | null;
            state: string | null;
            latest_breeding_count: number | null;
            latest_breeding_method: string | null;
            latest_estrus_date: string | null;
            latest_fertilization_date: string | null;
            latest_fertilization_content: string | null;
            expected_calving_date: string | null;
            expected_pregnancy_test_date: string | null;
            estrus_cycle: string | null;
          }>;
        };
      };
      create: {
        fieldData: {
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
          expected_pregnancy_test_date: string | null;
          estrus_cycle: string | null;
        };
        portalData: {
          'schedule|cows': Array<{
            owner_name: string | null;
            cow_code: string | null;
            state: string | null;
            latest_breeding_count: number | null;
            latest_breeding_method: string | null;
            latest_estrus_date: string | null;
            latest_fertilization_date: string | null;
            latest_fertilization_content: string | null;
            expected_calving_date: string | null;
            expected_pregnancy_test_date: string | null;
            estrus_cycle: string | null;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          add_date?: string | null;
          title?: string | null;
          content?: string | null;
          tag?: string | null;
          scheduled_date?: string | null;
          start_period?: string | null;
          end_period?: string | null;
          repeat_type?: number | null;
          repeat_interval?: number | null;
          repeat_end_date?: string | null;
          pk?: string;
          cow_code?: string | null;
          owner_name?: string | null;
          state?: string | null;
          latest_breeding_count?: number | null;
          latest_breeding_method?: string | null;
          latest_estrus_date?: string | null;
          latest_fertilization_date?: string | null;
          latest_fertilization_content?: string | null;
          expected_calving_date?: string | null;
          expected_pregnancy_test_date?: string | null;
          estrus_cycle?: string | null;
        }>;
        portalData: {
          'schedule|cows': Array<{
            recordId: string;
            owner_name?: string | null;
            cow_code?: string | null;
            state?: string | null;
            latest_breeding_count?: number | null;
            latest_breeding_method?: string | null;
            latest_estrus_date?: string | null;
            latest_fertilization_date?: string | null;
            latest_fertilization_content?: string | null;
            expected_calving_date?: string | null;
            expected_pregnancy_test_date?: string | null;
            estrus_cycle?: string | null;
          }>;
        };
      };
    };

    vaccine_program_master: {
      read: {
        fieldData: {
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
        portalData: {
          vaccine_prgram_schedule: Array<{
            pk: string;
            program_id: string | null;
            vaccine_id: number | null;
            days_from_birth: number | null;
            name: string | null;
          }>;
        };
      };
      create: {
        fieldData: {
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
        portalData: {
          vaccine_prgram_schedule: Array<{
            pk: string;
            program_id: string | null;
            vaccine_id: number | null;
            days_from_birth: number | null;
            name: string | null;
          }>;
        };
      };
      update: {
        fieldData: Partial<{
          name?: string | null;
          description?: string | null;
          tag?: string | null;
          pk?: string;
          id?: number | null;
          program_id?: string | null;
          vaccine_id?: number | null;
          days_from_birth?: number | null;
          hidden?: number | null;
          delete_flag?: number | null;
        }>;
        portalData: {
          vaccine_prgram_schedule: Array<{
            recordId: string;
            pk?: string;
            program_id?: string | null;
            vaccine_id?: number | null;
            days_from_birth?: number | null;
            name?: string | null;
          }>;
        };
      };
    };

    vaccine_prgram_schedule: {
      read: {
        fieldData: {
          program_id: string | null;
          vaccine_id: number | null;
          days_from_birth: number | null;
        };
      };
      create: {
        fieldData: {
          program_id: string | null;
          vaccine_id: number | null;
          days_from_birth: number | null;
        };
      };
      update: {
        fieldData: Partial<{
          program_id?: string | null;
          vaccine_id?: number | null;
          days_from_birth?: number | null;
        }>;
      };
    };
  };
  Script: {
    script: [
      { id: 26; name: 'onWindwos_fileName' },
      { id: 28; name: 'trigger' },
      { id: 23; name: '--' },
      { id: 30; name: 'test' },
      { id: 31; name: 'test 2' },
      { id: 1; name: 'アカウント制御' },
      { id: 2; name: '_アカウント登録' },
      { id: 3; name: '_アカウントパスワード更新' },
      { id: 6; name: '_アカウント有効化' },
      { id: 4; name: '_アカウント削除' },
      { id: 18; name: 'server_pdf' },
      { id: 22; name: 'pdf' },
      { id: 21; name: 'pdf_dairy_entry' },
      { id: 17; name: 'pdf_dairy_hansyoku' },
      { id: 19; name: 'excel_dairy_hansyoku' },
      { id: 20; name: 'server_excel' },
      { id: 24; name: '新規スクリプト' },
      { id: 27; name: 'onlayoutExit_cow_pk' },
      { id: 25; name: 'all_update' }
    ];
  };
};
