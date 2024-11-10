import { Dialog } from "primereact/dialog";
import { FC } from "react";
import useBetsCreate from "./hooks/useBetsCreate";
import { Controller } from "react-hook-form";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

const BetsCreate: FC = () => {
  const { form } = useBetsCreate();

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={true}
        modal
        onHide={() => {}}
        content={() => (
          <Card className="flex flex-column px-8 py-5 gap-4">
            <div className="inline-flex flex-column gap-2">
              <label className="text-primary-50 font-semibold">
                Quantidade
              </label>
              <Controller
                name={"amount"}
                control={form.formControl.control}
                render={({ field, fieldState }) => {
                  return (
                    <div>
                      <InputNumber
                        onChange={(event) => field.onChange(event.value)}
                        min={1}
                        showButtons
                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                        value={form.formControl.watch("amount")}
                      />
                      {fieldState.error && fieldState.error.message ? (
                        <small>{fieldState.error?.message}</small>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div  style={{ width: '100%', marginTop: 10, textAlign: "right" }}>
              <Button label="Confirmar" onClick={form.submit} severity="success" size="small" style={{marginRight: 5}}/>
              <Button label="Cancelar" onClick={form.close} severity="secondary" size="small"/>
            </div>
          </Card>
        )}
      ></Dialog>
    </div>
  );
};

export default BetsCreate;
