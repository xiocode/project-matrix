import { Rock } from "@ruiapp/move-style";
import { BusinessTableRockConfig } from "./business-table-types";
import BusinessTableMeta from "./BusinessTableMeta";
import { Pagination, Spin, Table } from "antd";
import { useSetState } from "ahooks";
import rapidApi from "~/rapidApi";

const DEFAULT_PAGE_SIZE = 20;

export default {
  onResolveState(props) {
    const [state, setState] = useSetState({});

    const {} = useDataSource();

    return {};
  },

  onReceiveMessage(message, state, props) {},

  Renderer(context, props, state) {
    const { pageSize = DEFAULT_PAGE_SIZE } = props;

    return (
      <Spin spinning={} className="pm-business-table--wrapper">
        <div className="pm-business-table--toolbar"></div>
        <Table />
        <Pagination pageSize={pageSize} current={0} />
      </Spin>
    );
  },

  ...BusinessTableMeta,
} as Rock<BusinessTableRockConfig>;

interface IDataSource {
  loading?: boolean;
}

function useDataSource() {
  const [state, setState] = useSetState<IDataSource>({});

  const request = async () => {
    if (state.loading) {
      return;
    }

    setState({ loading: true });
    await rapidApi["post"]("", {})
      .then((res) => {
        setState({ loading: false });
      })
      .catch((e) => {
        setState({ loading: false });
      });
  };

  return {
    ...state,
    request,
  };
}
