using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class order_orderdetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                schema: "oss-ecommerce",
                table: "OrderDetails",
                newName: "UnitPrice");

            migrationBuilder.RenameColumn(
                name: "email",
                schema: "oss-ecommerce",
                table: "EmailReport",
                newName: "Email");

            migrationBuilder.AddColumn<double>(
                name: "TotalIva",
                schema: "oss-ecommerce",
                table: "OrderDetails",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Total",
                schema: "oss-ecommerce",
                table: "Order",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "TotalIVA",
                schema: "oss-ecommerce",
                table: "Order",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalIva",
                schema: "oss-ecommerce",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Total",
                schema: "oss-ecommerce",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "TotalIVA",
                schema: "oss-ecommerce",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                schema: "oss-ecommerce",
                table: "OrderDetails",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Email",
                schema: "oss-ecommerce",
                table: "EmailReport",
                newName: "email");
        }
    }
}
