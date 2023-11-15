import React from "react";
import { ButtonComponent, Header, SearchComponent } from "components";
import { useTranslation } from "react-i18next";
import { COLORS } from "constants/colors";
import { useState } from "react";
export default function Warehouse() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  return (
    <div className="w-full bg-extreme_lg_grey min-h-screen">
      <Header width={"100%"} title={t("warehouse.warehouse")} />
      <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md px-3 py-5">
        <div className="w-full justify-between items-center flex">
          <div className="flex">
            <ButtonComponent
              onClick={() => {}}
              label={t("button.all")}
              backgroundColor={COLORS.defaultWhite}
              color={COLORS.txt_lightgrey}
              style={{
                borderColor: COLORS.lightGray,
                borderWidth: 1.5,
              }}
            />
            <div className="w-3" />
            <SearchComponent
              search={search}
              setSearch={setSearch}
              placeholder={t("warehouse.searchByName")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
