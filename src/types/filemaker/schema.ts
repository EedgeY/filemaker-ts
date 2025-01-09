export type FieldType = string | number | boolean | FieldData | FieldType[];

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
export type FMScriptName = FMDatabase['Script']['script'][number]['name'];

// テーブル（レイアウト）名を取得する型を追加
export type FMLayoutName = keyof FMDatabase['Table'];

export type FMDatabase = {
  Table: {
    users: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        furikana: 'string';
        hidden: 'number';
        pass: 'string';
        role: 'string';
        farm_id: 'number';
      };
    };
    farm: {
      fieldData: {
        _pk: 'string';
        farm_id: 'number';
        farm_name: 'string';
        owner_name: 'string';
        address: 'string';
        post_code: 'string';
        tel: 'string';
        FAX: 'string';
        mail: 'string';
        farm_code: 'string';
        pregnancy_test_days: 'number';
        pregnancy_days: 'number';
        billing_name: 'string';
        billing_address: 'string';
        billing_post_code: 'string';
        billing_tel: 'string';
        billing_fax: 'string';
        billing_mail: 'string';
        tax: 'number';
        invoice_code: 'string';
        calf_age_days: 'number';
        cattle_age_days: 'number';
      };
    };
    owner: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
        summer_price: 'number';
        修正情報タイムスタンプ: 'string';
        count: 'number';
      };
    };
    staff_master: {
      fieldData: {
        pk: 'string';
        id: 'number';
        name: 'string';
        furikana: 'string';
        hidden: 'number';
      };
    };
    herd_cattle_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
      };
    };
    pen_master: {
      fieldData: {
        id: 'number';
        _pk: 'string';
        name: 'string';
        delete_flag: 'number';
        hidden: 'number';
      };
    };
    variety_master: {
      fieldData: {
        pk: 'string';
        id: 'number';
        name: 'string';
        delete_flag: 'number';
        hidden: 'number';
      };
    };
    breeding_classification_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
        delete_flag: 'number';
      };
    };
    semen_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        price: 'number';
        hidden: 'number';
        semen_code: 'string';
        delete_flag: 'number';
      };
    };
    embryo_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        price: 'number';
        hidden: 'number';
      };
    };
    estrus_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
      };
    };
    reproductive_treatment_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        price: 'number';
        hidden: 'number';
      };
    };
    egg_inspection_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        remark: 'string';
        hidden: 'number';
      };
    };
    veterinarian_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
      };
    };
    treatment_crassification_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
      };
    };
    disease_name_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        type: 'string';
        hidden: 'number';
      };
    };
    symptoms_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        hidden: 'number';
      };
    };
    medicine_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        price: 'number';
        hidden: 'number';
      };
    };
    vaccine_master: {
      fieldData: {
        pk: 'string';
        id: 'number';
        name: 'string';
        type: 'string';
        price: 'number';
        hidden: 'number';
      };
    };
    special_payment_master: {
      fieldData: {
        _pk: 'string';
        id: 'number';
        name: 'string';
        classification: 'string';
        delete_flag: 'number';
      };
    };
    entry: {
      fieldData: {
        pk: 'string';
        fk_cow_pk: 'string';
        cow_number: 'string';
        owner_id: 'number';
        cow_id: 'number';
        date: 'string';
        type: 'string';
        remark: 'string';
        weight: 'string';
        height: 'string';
        cow_code: 'string';
        _fk_owner_pk: 'string';
        owner_name: 'string';
        label: 'string';
        birth_date: 'string';
        sex: 'string';
        in_day: 'string';
        out_day: 'string';
        destination_id: 'number';
        variety: 'string';
        desired_species_id_1: 'number';
        desired_species_id_2: 'number';
        desired_species_id_3: 'number';
        enrollment_check: 'number';
        state: 'string';
        in_count: 'number';
        estrus_cycle: 'string';
        expected_pregnancy_test_date: 'string';
        vaccine_program_id: 'string';
        Insemination_start_date: 'string';
        repeat_type: 'number';
        fk: 'string';
        add_date: 'string';
        title: 'string';
        content: 'string';
        tag: 'string';
        scheduled_date: 'string';
        start_period: 'string';
        end_period: 'string';
        repeat_interval: 'number';
        repeat_end_date: 'string';
      };
      portalData: {
        'entry|cows': {
          pk: 'string';
          _fk_owner_pk: 'string';
          owner_id: 'number';
          owner_name: 'string';
          cow_code: 'string';
          cow_number: 'string';
          cow_id: 'number';
          label: 'string';
          birth_date: 'string';
          sex: 'string';
          in_day: 'string';
          out_day: 'string';
          destination_id: 'number';
          variety: 'string';
          desired_species_id_1: 'number';
          desired_species_id_2: 'number';
          desired_species_id_3: 'number';
          enrollment_check: 'number';
          state: 'string';
          in_count: 'number';
          estrus_cycle: 'string';
          expected_pregnancy_test_date: 'string';
          vaccine_program_id: 'string';
          Insemination_start_date: 'string';
        };
        'entry|schedule': {
          pk: 'string';
          repeat_type: 'number';
          fk: 'string';
          cow_code: 'string';
          add_date: 'string';
          title: 'string';
          content: 'string';
          tag: 'string';
          scheduled_date: 'string';
          start_period: 'string';
          end_period: 'string';
          repeat_interval: 'number';
          repeat_end_date: 'string';
        };
      };
    };
    vaccine: {
      fieldData: {
        pk: 'string';
        fk_cow_pk: 'string';
        cow_number: 'string';
        owner_id: 'number';
        cow_id: 'number';
        '━━━━━━━━ 履歴': 'string';
        date: 'string';
        type: 'number';
        content_id: 'number';
        content: 'string';
        price: 'number';
        quantity: 'number';
        remark: 'string';
        作成情報タイムスタンプ: 'string';
        作成者: 'string';
        修正情報タイムスタンプ: 'string';
        修正者: 'string';
        veterinarian_id: 'number';
        veterinarian_name: 'string';
        manager: 'string';
      };
    };
    treatment: {
      fieldData: {
        pk: 'string';
        _fk_pk_cow: 'string';
        cow_number: 'string';
        owner_id: 'number';
        owner_name: 'string';
        cow_id: 'number';
        date: 'string';
        body_temperature: 'number';
        classification_id: 'number';
        disease_name_id: 'number';
        symptoms_id: 'number';
        treatment_content1_id: 'number';
        quantity1: 'number';
        treatment_content2_id: 'number';
        quantity2: 'number';
        treatment_content3_id: 'number';
        quantity3: 'number';
        treatment_content4_id: 'number';
        quantity4: 'number';
        veterinarian_id: 'number';
        treatment_classification: 'string';
        disease_name: 'string';
        symptoms: 'string';
        treatment_content1: 'string';
        treatment_content2: 'string';
        price2: 'number';
        treatment_content3: 'string';
        price3: 'number';
        treatment_content4: 'string';
        price4: 'number';
        reservation_date: 'string';
        veterinarian: 'string';
        manager: 'string';
        remark: 'string';
      };
    };
    breeding: {
      fieldData: {
        pk: 'string';
        fk: 'string';
        add_date: 'string';
        title: 'string';
        content: 'string';
        tag: 'string';
        scheduled_date: 'string';
        cow_code: 'string';
        owner_id: 'number';
        _fk_cow_pk: 'string';
        classification_name: 'string';
        date: 'string';
        content_note: 'string';
        price: 'number';
        quantity: 'number';
        remark: 'string';
        reservation_date: 'string';
        manager: 'string';
        veterinarian_name: 'string';
        label: 'string';
        state: 'string';
        pregnancy_test_date: 'string';
        delivery_date: 'string';
        expected_age_of_delivery: 'number';
        owner_name: 'string';
      };
      portalData: {
        'breeding|schedule': {
          pk: 'string';
          fk: 'string';
          add_date: 'string';
          title: 'string';
          content: 'string';
          tag: 'string';
          scheduled_date: 'string';
          cow_code: 'string';
        };
        'breeding|cows': {
          pk: 'string';
        };
      };
    };
    expected_pregnancy_test_date: {
      fieldData: {
        expected_pregnancy_test_date: 'string';
        owner_name: 'string';
        cow_code: 'string';
        cow_number: 'string';
      };
    };
    dashboard: {
      fieldData: {
        pk: 'string';
        date: 'string';
        enrollment_check: 'number';
        ai: 'number';
        et: 'number';
        hatujou: 'number';
        syoshin: 'number';
        saishin: 'number';
        hansyokutiryou: 'number';
        vaccine: 'string';
        idou: 'string';
        jokaku: 'string';
      };
      portalData: {
        cows_count1: {
          pk: 'string';
        };
        cows_count2: {
          pk: 'string';
        };
      };
    };
    'diary-report': {
      fieldData: {
        date: 'string';
        pk: 'string';
      };
      portalData: {
        'breeding|ai': {
          pk: 'string';
        };
        'breeding|et': {
          pk: 'string';
        };
        in_count: {
          pk: 'string';
        };
        out_count: {
          pk: 'string';
        };
        'breeding|hatujou': {
          pk: 'string';
        };
        diary_cowshed_move: {
          pk: 'string';
        };
        diary_treatment_hannsyokutiryou: {
          pk: 'string';
        };
        diary_treatment_saishin: {
          pk: 'string';
        };
        diary_treatment_syoshin: {
          pk: 'string';
        };
        diary_vaccine_count: {
          pk: 'string';
        };
      };
    };
    pdf_daily_hansyoku: {
      fieldData: {
        manager: 'string';
        veterinarian_name: 'string';
      };
    };
    pdf_daily_entry: {
      fieldData: {
        weight: 'string';
        cow_code: 'string';
        remark: 'string';
        cow_number: 'string';
        owner_name: 'string';
        height: 'string';
      };
    };
    pdf: {
      fieldData: {
        id: 'string';
        path: 'string';
      };
    };
    'cow-detail': {
      fieldData: {
        pk: 'string';
        _fk_owner_pk: 'string';
        owner_id: 'number';
        owner_name: 'string';
        cow_code: 'string';
        cow_number: 'string';
        cow_id: 'number';
        label: 'string';
        birth_date: 'string';
        sex: 'string';
        in_day: 'string';
        out_day: 'string';
        destination_id: 'number';
        variety: 'string';
        desired_species_id_1: 'number';
        desired_species_id_2: 'number';
        desired_species_id_3: 'number';
        fertilization_notes: 'string';
        in_weight: 'number';
        in_height: 'number';
        enrollment_check: 'number';
        state: 'string';
        in_count: 'number';
        estrus_cycle: 'string';
        Insemination_start_date: 'string';
        expected_pregnancy_test_date: 'string';
        vaccine_program_id: 'string';
        '━━━━━━━━ 繁殖': 'string';
        latest_breeding_count: 'number';
        latest_breeding_method: 'string';
        latest_estrus_date: 'string';
        latest_fertilization_date: 'string';
        latest_fertilization_content: 'string';
        expected_calving_date: 'string';
      };
    };
    cows: {
      fieldData: {
        pk: 'string';
        _fk_cow_pk: 'string';
        cow_code: 'string';
        owner_id: 'number';
        date: 'string';
        classification_name: 'string';
        content_note: 'string';
        price: 'number';
        quantity: 'number';
        remark: 'string';
        reservation_date: 'string';
        manager: 'string';
        veterinarian_name: 'string';
        state: 'string';
        pregnancy_test_date: 'string';
        delivery_date: 'string';
        expected_age_of_delivery: 'number';
        label: 'string';
        _fk_pk_cow: 'string';
        cow_number: 'string';
        owner_name: 'string';
        cow_id: 'number';
        body_temperature: 'number';
        classification_id: 'number';
        disease_name_id: 'number';
        symptoms_id: 'number';
        treatment_content1_id: 'number';
        quantity1: 'number';
        treatment_content2_id: 'number';
        quantity2: 'number';
        treatment_content3_id: 'number';
        quantity3: 'number';
        treatment_content4_id: 'number';
        quantity4: 'number';
        veterinarian_id: 'number';
        treatment_classification: 'string';
        disease_name: 'string';
        symptoms: 'string';
        treatment_content1: 'string';
        price1: 'number';
        treatment_content2: 'string';
        price2: 'number';
        treatment_content3: 'string';
        price3: 'number';
        treatment_content4: 'string';
        price4: 'number';
        veterinarian: 'string';
        farm_id: 'string';
        birth_date: 'string';
        sex: 'string';
        in_day: 'string';
        out_day: 'string';
      };
      portalData: {
        'cows|breeding|descend': {
          pk: 'string';
          _fk_cow_pk: 'string';
          cow_code: 'string';
          owner_id: 'number';
          date: 'string';
          classification_name: 'string';
          content_note: 'string';
          price: 'number';
          quantity: 'number';
          remark: 'string';
          reservation_date: 'string';
          manager: 'string';
          veterinarian_name: 'string';
          state: 'string';
          pregnancy_test_date: 'string';
          delivery_date: 'string';
          expected_age_of_delivery: 'number';
          label: 'string';
        };
        'cows|treatment': {
          pk: 'string';
          _fk_pk_cow: 'string';
          cow_number: 'string';
          owner_id: 'number';
          owner_name: 'string';
          cow_id: 'number';
          date: 'string';
          body_temperature: 'number';
          classification_id: 'number';
          disease_name_id: 'number';
          symptoms_id: 'number';
          treatment_content1_id: 'number';
          quantity1: 'number';
          treatment_content2_id: 'number';
          quantity2: 'number';
          treatment_content3_id: 'number';
          quantity3: 'number';
          treatment_content4_id: 'number';
          quantity4: 'number';
          veterinarian_id: 'number';
          treatment_classification: 'string';
          disease_name: 'string';
          symptoms: 'string';
          treatment_content1: 'string';
          price1: 'number';
          treatment_content2: 'string';
          price2: 'number';
          treatment_content3: 'string';
          price3: 'number';
          treatment_content4: 'string';
          price4: 'number';
          reservation_date: 'string';
          veterinarian: 'string';
          manager: 'string';
          remark: 'string';
        };
      };
    };
    cowshed_move: {
      fieldData: {
        pk: 'string';
        fk_cow_pk: 'string';
        cow_number: 'string';
        owner_id: 'number';
        cow_id: 'number';
        date: 'string';
        種別: 'string';
        cowshed_id: 'number';
        cowshed_name: 'string';
        pen_id: 'number';
        pen_name: 'string';
        remark: 'string';
        作成情報タイムスタンプ: 'string';
        作成者: 'string';
        修正情報タイムスタンプ: 'string';
        修正者: 'string';
      };
    };
    exit: {
      fieldData: {
        pk: 'string';
        fk_cow_pk: 'string';
        cow_number: 'string';
        owner_id: 'number';
        cow_id: 'number';
        date: 'string';
        type: 'string';
        remark: 'string';
      };
    };
    'cows-list': {
      fieldData: {
        owner_name: 'string';
        cow_code: 'string';
        cow_number: 'string';
        enrollment_check: 'number';
        pk: 'string';
        owner_id: 'number';
      };
    };
    measurement: {
      fieldData: {
        weight: 'number';
        height: 'number';
        date: 'string';
      };
    };
    schedule: {
      fieldData: {
        add_date: 'string';
        title: 'string';
        content: 'string';
        tag: 'string';
        scheduled_date: 'string';
        start_period: 'string';
        end_period: 'string';
        repeat_type: 'number';
        repeat_interval: 'number';
        repeat_end_date: 'string';
        pk: 'string';
        cow_code: 'string';
        owner_name: 'string';
        state: 'string';
        latest_breeding_count: 'number';
        latest_breeding_method: 'string';
        latest_estrus_date: 'string';
        latest_fertilization_date: 'string';
        latest_fertilization_content: 'string';
        expected_calving_date: 'string';
        expected_pregnancy_test_date: 'string';
        estrus_cycle: 'string';
      };
      portalData: {
        'schedule|cows': {
          owner_name: 'string';
          cow_code: 'string';
          state: 'string';
          latest_breeding_count: 'number';
          latest_breeding_method: 'string';
          latest_estrus_date: 'string';
          latest_fertilization_date: 'string';
          latest_fertilization_content: 'string';
          expected_calving_date: 'string';
          expected_pregnancy_test_date: 'string';
          estrus_cycle: 'string';
        };
      };
    };
    vaccine_program_master: {
      fieldData: {
        name: 'string';
        description: 'string';
        tag: 'string';
        pk: 'string';
        id: 'number';
        program_id: 'string';
        vaccine_id: 'number';
        days_from_birth: 'number';
        hidden: 'number';
        delete_flag: 'number';
      };
      portalData: {
        vaccine_prgram_schedule: {
          pk: 'string';
          program_id: 'string';
          vaccine_id: 'number';
          days_from_birth: 'number';
          name: 'string';
        };
      };
    };
    vaccine_prgram_schedule: {
      fieldData: {
        program_id: 'string';
        vaccine_id: 'number';
        days_from_birth: 'number';
      };
    };
  };
  Script: {
    script: [
      {
        id: '26';
        name: 'onWindwos_fileName';
      },
      {
        id: '28';
        name: 'trigger';
      },
      {
        id: '23';
        name: '--';
      },
      {
        id: '30';
        name: 'test';
      },
      {
        id: '31';
        name: 'test 2';
      },
      {
        id: '1';
        name: 'アカウント制御';
      },
      {
        id: '2';
        name: '_アカウント登録';
      },
      {
        id: '3';
        name: '_アカウントパスワード更新';
      },
      {
        id: '6';
        name: '_アカウント有効化';
      },
      {
        id: '4';
        name: '_アカウント削除';
      },
      {
        id: '18';
        name: 'server_pdf';
      },
      {
        id: '22';
        name: 'pdf';
      },
      {
        id: '21';
        name: 'pdf_dairy_entry';
      },
      {
        id: '17';
        name: 'pdf_dairy_hansyoku';
      },
      {
        id: '19';
        name: 'excel_dairy_hansyoku';
      },
      {
        id: '20';
        name: 'server_excel';
      },
      {
        id: '24';
        name: '新規スクリプト';
      },
      {
        id: '27';
        name: 'onlayoutExit_cow_pk';
      },
      {
        id: '25';
        name: 'all_update';
      }
    ];
  };
};
