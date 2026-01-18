import { useSnackbar } from "@/components/SnackbarProvider";
import { useAlert } from "@/components/providers/AlertProvider";

type Identifiable = {
  id: string;
};

type UseCrudActionsParams<T extends Identifiable> = {
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  updateApi: (item: T) => Promise<void>;
  deleteApi: (id: string) => Promise<void>;
  messages: {
    updateSuccess: string;
    deleteSuccess: string;
    error: string;
    deleteConfirm: (label: string) => string;
  };
};

export function useCrudActions<T extends Identifiable>({
  setItems,
  updateApi,
  deleteApi,
  messages,
}: UseCrudActionsParams<T>) {
  const { showSnackbar } = useSnackbar();
  const { showAlert } = useAlert();

  function updateItem(item: T) {
    updateApi(item)
      .then(() => {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? item : i)),
        );
        showSnackbar(messages.updateSuccess);
      })
      .catch(() => {
        showSnackbar(messages.error);
      });
  }

  function deleteItemWithConfirm(itemId: string, itemLabel: string) {
    showAlert({
      title: "Conferma eliminazione",
      message: messages.deleteConfirm(itemLabel),
      okText: "Elimina",
      notOkText: "Annulla",
      onOk: () => {
        deleteApi(itemId)
          .then(() => {
            setItems((prev) => prev.filter((i) => i.id !== itemId));
            showSnackbar(messages.deleteSuccess);
          })
          .catch(() => {
            showSnackbar(messages.error);
          });
      },
      onNotOk: () => {},
    });
  }

  return {
    updateItem,
    deleteItemWithConfirm,
  };
}
