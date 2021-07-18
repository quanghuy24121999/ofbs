package edu.fpt.ofbs.gateway;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import edu.fpt.ofbs.models.payment.input.*;

import edu.fpt.ofbs.models.payment.ouput.*;

public class Gateway {

    // link api live
//    private final String query = "https://www.nganluong.vn/checkout.api.nganluong.post.php";
    // link api test
    private final String query = "https://sandbox.nganluong.vn:8088/nl30/checkout.api.nganluong.post.php";

    public ResponseInfo chage(RequestInfo info) throws Exception {
        String result = callUrl(query, GetParamPost(info), "");
        result = result.replace("&", "&amp;");
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        InputSource is = new InputSource();
        is.setCharacterStream(new StringReader(result));

        Document doc = db.parse(is);
        NodeList nodes = doc.getElementsByTagName("result");

        ResponseInfo response = new ResponseInfo();
        for (int i = 0; i < nodes.getLength(); i++) {
            Element element = (Element) nodes.item(i);

            NodeList name = element.getElementsByTagName("error_code");
            Element line = (Element) name.item(0);
            response.setError_code(getCharacterDataFromElement(line));

            NodeList title = element.getElementsByTagName("token");
            line = (Element) title.item(0);
            response.setToken(getCharacterDataFromElement(line));

            NodeList description = element.getElementsByTagName("description");
            line = (Element) description.item(0);
            response.setDescription(getCharacterDataFromElement(line));

            NodeList checkout_url = element.getElementsByTagName("checkout_url");
            line = (Element) checkout_url.item(0);
            response.setCheckout_url(getCharacterDataFromElement(line));
        }
        return response;
    }

    public ResponseCheckOrder checkOrder(RequestCheckOrder info) throws Exception {
        String request = "";
        request += "function=" + info.getFuntion();
        request += "&version=" + info.getVersion();
        request += "&merchant_id=" + info.getMerchant_id();
        request += "&merchant_password=" + CreateMD5Hash(info.getMerchant_password());
        request += "&token=" + info.getToken();
        String result = callUrl(query, request, "");
        result = result.replace("&", "&amp;");
        
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        InputSource is = new InputSource();
        is.setCharacterStream(new StringReader(result));

        Document doc = db.parse(is);
        NodeList nodes = doc.getElementsByTagName("result");

        ResponseCheckOrder response = new ResponseCheckOrder();
        for (int i = 0; i < nodes.getLength(); i++) {
            Element element = (Element) nodes.item(i);

            NodeList name = element.getElementsByTagName("error_code");
            Element line = (Element) name.item(0);
            response.setError_code(getCharacterDataFromElement(line));

            NodeList title = element.getElementsByTagName("token");
            line = (Element) title.item(0);
            response.setToken(getCharacterDataFromElement(line));
            
            NodeList description = element.getElementsByTagName("description");
            line = (Element) description.item(0);
            response.setDescription(getCharacterDataFromElement(line));
            
            NodeList transaction_status = element.getElementsByTagName("transaction_status");
            line = (Element) transaction_status.item(0);
            response.setTransaction_status(getCharacterDataFromElement(line));
            
            NodeList receiver_email = element.getElementsByTagName("receiver_email");
            line = (Element) receiver_email.item(0);
            response.setReceiver_email(getCharacterDataFromElement(line));
            
            NodeList order_code = element.getElementsByTagName("order_code");
            line = (Element) order_code.item(0);
            response.setOrder_code(getCharacterDataFromElement(line));
            
            NodeList total_amount = element.getElementsByTagName("total_amount");
            line = (Element) total_amount.item(0);
            response.setTotal_amount(getCharacterDataFromElement(line));
            
            NodeList payment_method = element.getElementsByTagName("payment_method");
            line = (Element) payment_method.item(0);
            response.setPayment_method(getCharacterDataFromElement(line));
            
            NodeList bank_code = element.getElementsByTagName("bank_code");
            line = (Element) bank_code.item(0);
            response.setBank_code(getCharacterDataFromElement(line));
            
            NodeList payment_type = element.getElementsByTagName("payment_type");
            line = (Element) payment_type.item(0);
            response.setPayment_type(getCharacterDataFromElement(line));
            
            NodeList order_description = element.getElementsByTagName("order_description");
            line = (Element) order_description.item(0);
            response.setOrder_description(getCharacterDataFromElement(line));
            
            NodeList tax_amount = element.getElementsByTagName("tax_amount");
            line = (Element) tax_amount.item(0);
            response.setTax_amount(getCharacterDataFromElement(line));
            
            NodeList discount_amount = element.getElementsByTagName("discount_amount");
            line = (Element) discount_amount.item(0);
            response.setDiscount_amount(getCharacterDataFromElement(line));
            
            NodeList fee_shipping = element.getElementsByTagName("fee_shipping");
            line = (Element) fee_shipping.item(0);
            response.setFee_shipping(getCharacterDataFromElement(line));
            
            NodeList return_url = element.getElementsByTagName("return_url");
            line = (Element) return_url.item(0);
            response.setReturn_url(getCharacterDataFromElement(line));
            
            NodeList cancel_url = element.getElementsByTagName("cancel_url");
            line = (Element) cancel_url.item(0);
            response.setCancel_url(getCharacterDataFromElement(line));
            
            NodeList buyer_fullname = element.getElementsByTagName("buyer_fullname");
            line = (Element) buyer_fullname.item(0);
            response.setBuyer_fullname(getCharacterDataFromElement(line));
            
            NodeList buyer_email = element.getElementsByTagName("buyer_email");
            line = (Element) buyer_email.item(0);
            response.setBuyer_email(getCharacterDataFromElement(line));
            
            NodeList buyer_mobile = element.getElementsByTagName("buyer_mobile");
            line = (Element) buyer_mobile.item(0);
            response.setBuyer_mobile(getCharacterDataFromElement(line));
            
            NodeList buyer_address = element.getElementsByTagName("buyer_address");
            line = (Element) buyer_address.item(0);
            response.setBuyer_address(getCharacterDataFromElement(line));
            
            NodeList affiliate_code = element.getElementsByTagName("affiliate_code");
            line = (Element) affiliate_code.item(0);
            response.setAffiliate_code(getCharacterDataFromElement(line));
            
            NodeList transaction_id = element.getElementsByTagName("transaction_id");
            line = (Element) transaction_id.item(0);
            response.setTransaction_id(getCharacterDataFromElement(line));
        }
        return response;
    }

    public static String getCharacterDataFromElement(Element e) {
        Node child = e.getFirstChild();
        if (child instanceof CharacterData) {
            CharacterData cd = (CharacterData) child;
            return cd.getData();
        }
        return "";
    }

    public static String callUrl(String strUrl, String query, String type) throws Exception {
        URL url = new URL(strUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
        con.setReadTimeout(180000);
        con.setDoOutput(true);
        try (DataOutputStream wr = new DataOutputStream((con.getOutputStream()))) {
            wr.writeBytes(query);
            wr.flush();
        }

        StringBuilder response = new StringBuilder();
        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()))) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine).append("\n");
            }
        }
        String rsp = response.toString();
        rsp = rsp.substring(0, rsp.length() - 1);
        return rsp;
    }

    private static String GetParamPost(RequestInfo info) throws Exception {
        String request = "";
        request += "function=" + info.getFuntion();
        request += "&cur_code=" + info.getCur_code();
        request += "&version=" + info.getVersion();
        request += "&merchant_id=" + info.getMerchant_id();
        request += "&receiver_email=" + info.getReceiver_email();
        request += "&merchant_password=" + CreateMD5Hash(info.getMerchant_password());
        request += "&order_code=" + info.getOrder_code();
        request += "&total_amount=" + info.getTotal_amount();
        request += "&payment_method=" + info.getPayment_method();
        request += "&bank_code=" + info.getBank_code();
        request += "&payment_type=" + info.getPayment_type();
        request += "&order_description=" + info.getOrder_description();
        request += "&tax_amount=" + info.getTax_amount();
        request += "&fee_shipping=" + info.getFee_shipping();
        request += "&discount_amount=" + info.getDiscount_amount();
        request += "&return_url=" + info.getReturn_url();
        request += "&cancel_url=" + info.getCancel_url();
        request += "&buyer_fullname=" + info.getBuyer_fullname();
        request += "&buyer_email=" + info.getBuyer_email();
        request += "&buyer_mobile=" + info.getBuyer_mobile();
        return request;
    }

    private static String CreateMD5Hash(String s) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] array = md.digest(s.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for (byte b : array) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private static String GetErrorMessage(String _ErrorCode) {
        String _Message = "";
        switch (_ErrorCode) {
            case "00":
                _Message = "Giao dịch thành công";
                break;
            case "01":
                _Message = "Lỗi, địa chỉ IP truy cập API của NgânLượng.vn bị từ chối";
                break;
            case "02":
                _Message = "Lỗi, tham số gửi từ merchant tới NgânLượng.vn chưa chính xác.";
                break;
            case "03":
                _Message = "Lỗi, mã merchant không tồn tại hoặc merchant đang bị khóa kết nối tới NgânLượng.vn";
                break;
            case "04":
                _Message = "Lỗi, mã checksum không chính xác";
                break;
            case "05":
                _Message = "Tài khoản nhận tiền nạp của merchant không tồn tại";
                break;
            case "06":
                _Message = "Tài khoản nhận tiền nạp của  merchant đang bị khóa hoặc bị phong tỏa, không thể thực hiện được giao dịch nạp tiền";
                break;
            case "07":
                _Message = "Thẻ đã được sử dụng";
                break;
            case "08":
                _Message = "Thẻ bị khóa";
                break;
            case "09":
                _Message = "Thẻ hết hạn sử dụng";
                break;
            case "10":
                _Message = "Thẻ chưa được kích hoạt hoặc không tồn tại";
                break;
            case "11":
                _Message = "Mã thẻ sai định dạng";
                break;
            case "12":
                _Message = "Sai số serial của thẻ";
                break;
            case "13":
                _Message = "Mã thẻ và số serial không khớp";
                break;
            case "14":
                _Message = "Thẻ không tồn tại";
                break;
            case "15":
                _Message = "Thẻ không sử dụng được";
                break;
            case "16":
                _Message = "Số lần tưử của thẻ vượt quá giới hạn cho phép";
                break;
            case "17":
                _Message = "Hệ thống Telco bị lỗi hoặc quá tải, thẻ chưa bị trừ";
                break;
            case "18":
                _Message = "Hệ thống Telco  bị lỗi hoặc quá tải, thẻ có thể bị trừ, cần phối hợp với nhà mạng để đối soát";
                break;
            case "19":
                _Message = "Kết nối NgânLượng với Telco bị lỗi, thẻ chưa bị trừ.";
                break;
            case "20":
                _Message = "Kết nối tới Telco thành công, thẻ bị trừ nhưng chưa cộng tiền trên NgânLượng.vn";
                break;
            case "99":
                _Message = "Lỗi tuy nhiên lỗi chưa được định nghĩa hoặc chưa xác định được nguyên nhân";
                break;
        }
        return _Message;
    }
}
