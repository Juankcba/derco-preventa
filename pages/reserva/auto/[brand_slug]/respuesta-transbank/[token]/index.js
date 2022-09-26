import clienteAxios from "../../../../../config/axios";
import BasicLayout from "../../../../../layout/BasicLayout";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import { setPreorderTransaction } from "../../../../../redux/actions/preorderActions"


const RespuestaTransbank = ({ order }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const preorder = useSelector((state) => state.preorder.data)
  const preorderModelSlug = preorder?.slug

  useEffect(() => {
    dispatch(setPreorderTransaction(order))
    localStorage.setItem('response-code-t', order.token_ws)
  }, [order])

  useEffect(() => {
    if (!preorderModelSlug || !order.status) {
      return
    }
    switch (order.status) {
      case '0':
        router.push({
          pathname: '/preventa/[slug]/respuesta-transbank/pago-exitoso',
          query: { slug: preorderModelSlug }
        })
        break;
      case '403':
        router.push({
          pathname: '/preventa/[slug]/respuesta-transbank/auto-ya-comprado',
          query: { slug: preorderModelSlug }
        })
        break;
      default:
        router.push({
          pathname: '/preventa/[slug]/respuesta-transbank/error-en-pago',
          query: { slug: preorderModelSlug }
        })
        break;
    }
  }, [router, order, preorderModelSlug])


  return (
    <BasicLayout preventa={{ status: true, step: 3 }}>
      <div className="flex justify-center items-center py-12">
        <img
              src="https://s3.amazonaws.com/dercocenter.cl/preventa/assets/ajax-loader.gif"
              alt="loading"
            />
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps({ params }) {
  const { data: order } = await clienteAxios.get(`pre-order/transaction/${params.token}`)
  return {
    props: { order }
  }
}

export default RespuestaTransbank;