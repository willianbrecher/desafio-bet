import { Dialog } from "primereact/dialog";
import { FC } from "react";
import useBetsCreate from "./hooks/useBetsCreate";
import { Toast } from "primereact/toast";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

const BetsCreate: FC = () => {
  const { form } = useBetsCreate();

  return (
    <Dialog
      visible={true}
      modal
      onHide={() => {}}
      content={() => (
        <Card className="flex flex-column px-8 py-5 gap-2">
          <div className="inline-flex flex-column gap-2">
            <Controller
              name={"amount"}
              control={form.formControl.control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <label>Quantidade</label>
                    <InputNumber
                      onChange={event => field.onChange(event.value)}
                      min={1}
                      showButtons 
                      value={form.formControl.watch("amount")}
                    />
                    {fieldState.error && fieldState.error.message ? (
                      <small>{fieldState.error?.message}</small>
                    ) : (
                      <></>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="flex align-items-center gap-2">
            <Button label="Confirmar" onClick={form.submit}></Button>
            <Button label="Cancelar" onClick={form.close}></Button>
          </div>
        </Card>
      )}
    ></Dialog>
  );
};

export default BetsCreate;
